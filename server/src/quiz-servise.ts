import Answer, { IAnswer } from "./models/Answer";
import Question, { IQuestion } from "./models/Question";
import Quiz, { IQuiz } from "./models/Quiz";
import Result, { IResult } from "./models/Result";
import UserAnswer from "./models/UserAnswer";

interface ICreateQuiz {
  quizdata: IQuiz;
  questiondata: IQuestion[];
}
interface IRunQuiz {
  time: string;
  quizdata: IQuiz;
  questiondata: IQuestion[];
}

interface IAnswerData {
  _id: any;
  isCorrect: boolean;
  answer_text: string;
  question_id: any;
}
interface IUserAnswerData {
  isCorrect: boolean;
  answer_text: string;
  question_id: string;
}
interface IQuestionData {
  question_text: string;
  question_type: string;
  answers: IAnswerData[];
}
interface IQuizById {
  quizdata: { title: string; description: string; editsTime: number };
  questiondata: IQuestionData[];
}

export interface IPaginateOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

class QuizServise {
  getAllQuizes = async (options: IPaginateOptions): Promise<IQuiz[]> => {
    const {
      page = 1,
      limit = 9,
      sortBy = "createdAt",
      order = "desc",
    } = options;
    try {
      const sortOrder = order === "desc" ? -1 : 1;
      const quizes = await Quiz.find()
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit);
      return quizes;
    } catch (error) {
      throw new Error(`Error getting quizes: ${error}`);
    }
  };

  getQuizById = async (id: string): Promise<IQuizById | null> => {
    try {
      const quiz = await Quiz.findById(id);
      const questions = await Question.find({ quiz_id: quiz?._id });

      let dataQuiz: IQuizById | null = null;
      if (quiz && questions) {
        let questionsArr: IQuestionData[] = [];

        for (const question of questions) {
          let questiondata: IQuestionData = {
            question_text: question.question_text,
            question_type: question.question_type,
            answers: [],
          };

          const answers = await Answer.find({ question_id: question._id });

          let answersArr: IAnswerData[] = [];

          for (const answer of answers) {
            let answerForQuestion: IAnswerData = {
              _id: answer._id,
              answer_text: answer.answer_text,
              isCorrect: answer.isCorrect,
              question_id: question._id,
            };
            answersArr.push(answerForQuestion);
          }

          questiondata.answers = answersArr;
          questionsArr.push(questiondata);
        }

        dataQuiz = {
          quizdata: {
            title: quiz.title,
            description: quiz.description,
            editsTime: quiz.editsTime,
          },
          questiondata: questionsArr,
        };
      }
      return dataQuiz;
    } catch (error) {
      throw new Error(`Error getting quiz: ${error}`);
    }
  };
  createQuiz = async ({
    quizdata,
    questiondata,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  }: ICreateQuiz & {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: "asc" | "desc";
  }): Promise<IQuiz[]> => {
    try {
      const quiz = new Quiz({
        title: quizdata.title,
        description: quizdata.description,
        qtyQuestions: questiondata.length,
        editsTime: 0,
      });
      await quiz.save();
      for (const item of questiondata) {
        const newQuestion = new Question({
          quiz_id: quiz._id,
          question_text: item.question_text,
          question_type: item.question_type,
        });
        await newQuestion.save();

        const answersdata = item.answers;
        for (const answer of answersdata) {
          const newAnswer = new Answer({
            question_id: newQuestion._id,
            answer_text: answer.answer_text,
            isCorrect: answer.isCorrect,
          });
          await newAnswer.save();
        }
      }
      const quizes = this.getAllQuizes({ page, limit, sortBy, order });
      return quizes;
    } catch (error) {
      throw new Error(`Error creatting quiz: ${error}`);
    }
  };

  updeteQuiz = async (
    id: string,
    {
      quizdata,
      questiondata,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    }: ICreateQuiz & {
      page?: number;
      limit?: number;
      sortBy?: string;
      order?: "asc" | "desc";
    }
  ): Promise<IQuiz[]> => {
    try {
      quizdata.editsTime += 1;
      if (quizdata)
        await Quiz.findByIdAndUpdate(id, quizdata, {
          new: true,
        });
      if (questiondata) {
        for (const question of questiondata) {
          await Question.findByIdAndUpdate(question._id, question, {
            new: true,
          });
          const answersdata = question.answers;
          for (const answer of answersdata) {
            await Answer.findByIdAndUpdate(
              answer._id,
              {
                question_id: question._id,
                answer_text: answer.answer_text,
                isCorrect: answer.isCorrect,
                _id: answer._id,
              },
              {
                new: true,
              }
            );
          }
        }
      }
      return this.getAllQuizes({ page, limit, sortBy, order });
    } catch (error) {
      throw new Error(`Error updating quiz: ${error}`);
    }
  };

  getCorrectAnswersByQuizId = async (quiz_id: string) => {
    const questions = await Question.find({ quiz_id }).populate("answers");

    let correctAnswers = [];
    for (const question of questions) {
      const answersForQuestionId = await Answer.find({
        question_id: question._id,
      });
      const rightAnswerForQuestionId = answersForQuestionId.filter(
        (answer) => answer.isCorrect
      );
      correctAnswers.push({
        question_id: rightAnswerForQuestionId[0].question_id,
        right_text: rightAnswerForQuestionId[0].answer_text,
      });
    }

    return correctAnswers;
  };

  getResult = async (quiz_id: string): Promise<IResult[]> => {
    try {
      const result = await Result.find({ quiz_id: quiz_id });
      return result;
    } catch (error) {
      throw new Error(`Error getting result: ${error}`);
    }
  };

  createResult = async (
    quiz_id: string,
    time: string,
    useranswers: IRunQuiz
  ): Promise<{
    results: IResult[];
    summary: { question: string; userAnswer: string; correctAnswer: string }[];
  }> => {
    try {
      const correctAnswers = await this.getCorrectAnswersByQuizId(quiz_id);

      const summary: {
        question: string;
        userAnswer: string;
        correctAnswer: string;
      }[] = [];

      useranswers.questiondata.forEach((question) => {  
        // Найдем правильный ответ из correctAnswersArray по question_id  
        const correctAnswerObj = correctAnswers.find(  
            (answer) => answer.question_id.toString() === question.answers[0]?.question_id.toString()  
        );  

        // Получаем правильный текст ответа  
        const correctAnswer = correctAnswerObj ? correctAnswerObj.right_text : "Нет правильного ответа";  

        // Итерируемся по ответам пользователя (в данном случае берем первый ответ из answers, если он есть)  
        const userAnswer = question.answers.find(answer => answer.isCorrect)?.answer_text || "Нет ответа пользователя";  

        // Добавляем результат в сводный массив  
        summary.push({  
            question: question.question_text,  
            userAnswer: userAnswer,  
            correctAnswer: correctAnswer,  
        });  
    });  

      await Result.findOneAndUpdate({ quiz_id }, { submitingTime: time });
      await UserAnswer.findOneAndUpdate({ quiz_id }, { useranswers });
      return { results: await this.getResult(quiz_id), summary };
    } catch (error) {
      throw new Error(`Error creating result: ${error}`);
    }
  };

  deleteQuiz = async (id: string): Promise<string> => {
    try {
      await Quiz.deleteOne({ _id: id });
      return `Quiz with id ${id} deleted successfully`;
    } catch (error) {
      throw new Error(`Error removing quiz: ${error}`);
    }
  };
}

export default new QuizServise();
