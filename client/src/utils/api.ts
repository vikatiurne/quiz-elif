import {
  Options,
  Quiz,
  QuizFormValue,
  Result,
  UserAnswer,
} from "@/types/types";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const fetchGetQuizes = async (options: Options): Promise<Quiz[]> => {
  try {
    const quizes = await axios.get(`${API_URL}/getQuizes`, {
      params: {
        page: options.page,
        limit: options.limit,
        sortBy: options.sortBy,
        order: options.order,
      },
    });
    return quizes.data;
  } catch (error: any) {
    throw new Error(`Error getting quizes:${error.message}`);
  }
};
export const fetchGetQuizById = async (id: string): Promise<QuizFormValue> => {
  try {
    const quiz = await axios.get(`${API_URL}/getQuizById/${id}`);
    return quiz.data;
  } catch (error: any) {
    throw new Error(`Error getting quiz:${error.message}`);
  }
};
export const fetchCreateQuiz = async (data: QuizFormValue): Promise<Quiz[]> => {
  try {
    const quizes = await axios.post(`${API_URL}/createQuiz`, { data });
    return quizes.data;
  } catch (error: any) {
    throw new Error(`Error creating quiz:${error.message}`);
  }
};
export const fetchDeleteQuiz = async (id: string): Promise<string> => {
  try {
    const quizes = await axios.put(`${API_URL}/deleteQuiz/${id}`);
    return quizes.data;
  } catch (error: any) {
    throw new Error(`Error updating quiz:${error.message}`);
  }
};
export const fetchUpdateQuiz = async (
  id: string,
  data: QuizFormValue
): Promise<Quiz[]> => {
  try {
    const quizes = await axios.put(`${API_URL}/updateQuiz/${id}`, { data });
    return quizes.data;
  } catch (error: any) {
    throw new Error(`Error updating quiz:${error.message}`);
  }
};
export const fetchGetResult = async (id: string): Promise<Result | void> => {
  try {
    const result = await axios.get(`${API_URL}/getResult/${id}`);
    return result.data;
  } catch (error: any) {
    throw new Error(`Error getting result:${error.message}`);
  }
};
export const fetchCreateResult = async (
  id: string,
  time: string,
  useranswers: UserAnswer[]
): Promise<Result> => {
  try {
    const result = await axios.post(`${API_URL}/createResult/${id}`, {
      time,
      useranswers,
    });
    return result.data;
  } catch (error: any) {
    throw new Error(`Error getting result:${error.message}`);
  }
};
