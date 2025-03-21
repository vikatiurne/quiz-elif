export interface Answer {
  _id: string;
  question_id: string;
  answer_text: string;
  isCorrect: boolean;
}

export interface Question {
  _id: string;
  quiz_id: string;
  question_text: string;
  question_type: string;
  answers: Answer[];
}

export interface UserAnswer {
  isCorrect: boolean;
  answer_text: string;
  question_id: string;
}

export interface Result {
  _id: string;
  quiz_id: string;
  submitingTime: string;
  useranswers: UserAnswer[];
  summary: { question: string; userAnswer: string; correctAnswer: string };
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  qtyQuestions: number;
  questions: Question[];
  editsTime: number;
  submitingTime: Result["submitingTime"];
}

export interface Options {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
}

interface AnswerData {
  _id: string;
  isCorrect: boolean;
  answer_text: string;
  question_id: string;
}
export interface QuestionData {
  _id: string;
  question_text: string;
  question_type: string;
  answers: AnswerData[];
}

export interface QuizFormValue {
  quizdata: { title: string; description: string; editsTime: number };
  questiondata: QuestionData[];
}
