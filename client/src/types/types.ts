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
  _id: string;
  question_id: string;
  text: string;
}

export interface Result {
  _id: string;
  quiz_id: string;
  submitingTime: string;
  useranswers: UserAnswer[];
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  editsTime: number;
  submitingTime: Result["submitingTime"];
}
