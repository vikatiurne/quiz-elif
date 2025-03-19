import Answer, { IAnswer } from "./models/Answer";
import Question, { IQuestion } from "./models/Question";
import Quiz, { IQuiz } from "./models/Quiz";
import Result, { IResult } from "./models/Result";
import UserAnswer from "./models/UserAnswer";

interface ICreateQuiz {
  quizdata: IQuiz;
  questionsdata: IQuestion[];
  answersdata: IAnswer[];
}

interface IPaginateOptions {
  page: number;
  limit: number;
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
  getQuizById = async (id: string): Promise<IQuiz | null> => {
    try {
      const quiz = await Quiz.findById(id);
      return quiz;
    } catch (error) {
      throw new Error(`Error getting quiz: ${error}`);
    }
  };
  createQuiz = async ({
    quizdata,
    questionsdata,
    answersdata,
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
      const quiz = new Quiz(quizdata);
      await quiz.save();
      for (const question of questionsdata) {
        const newQuestion = new Question(question);
        await newQuestion.save();
      }
      for (const answer of answersdata) {
        const newAnswer = new Answer(answer);
        await newAnswer.save();
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
      questionsdata,
      answersdata,
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
      if (questionsdata) {
        for (const question of questionsdata) {
          await Question.findByIdAndUpdate(question._id, questionsdata, {
            new: true,
          });
        }
      }
      if (answersdata) {
        for (const answer of answersdata) {
          await Answer.findByIdAndUpdate(answer._id, answersdata, {
            new: true,
          });
        }
      }
      return this.getAllQuizes({ page, limit, sortBy, order });
    } catch (error) {
      throw new Error(`Error updating quiz: ${error}`);
    }
  };

  getCorrectAnswersByQuizId = async (
    quiz_id: string
  ): Promise<{ question_id: string; correct_answer: string }[]> => {
    const questions = (await Question.find({ quiz_id }).populate(
      "answers"
    )) as IQuestion[];

    const correctAnswers: { question_id: string; correct_answer: string }[] =
      questions.flatMap((question) =>
        question.answers
          .filter((answer: IAnswer) => answer.isCorrect)
          .map((answer: IAnswer) => ({
            question_id: answer.question_id.toString(),
            correct_answer: answer.answer_text,
          }))
      );
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
    { answersdata }: ICreateQuiz
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

      for (const answer of answersdata) {
        const correctAnswerItem = correctAnswers.find(
          (item) => item.question_id === answer.question_id.toString()
        );

        if (correctAnswerItem) {
          summary.push({
            question: answer.question_id.toString(),
            userAnswer: answer.answer_text,
            correctAnswer: correctAnswerItem.correct_answer,
          });
        }
      }
      await Result.findOneAndUpdate({ quiz_id }, { submitingTime: time });
      await UserAnswer.findOneAndUpdate({ quiz_id }, { answersdata });
      return { results: await this.getResult(quiz_id), summary };
    } catch (error) {
      throw new Error(`Error creating result: ${error}`);
    }
  };

  deleteQuiz = async (
    id: string,
    options: IPaginateOptions
  ): Promise<IQuiz[]> => {
    try {
      await Quiz.deleteOne({ _id: id });
      return await this.getAllQuizes(options);
    } catch (error) {
      throw new Error(`Error removing quiz: ${error}`);
    }
  };
}

export default new QuizServise();
