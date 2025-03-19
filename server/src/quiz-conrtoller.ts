import { NextFunction, Request, Response } from "express";
import quizServise from "./quiz-servise";

class QuizController {
  getAllQuizes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { options } = req.body;
      const quizes = await quizServise.getAllQuizes(options);
      res.status(200).json(quizes);
    } catch (error) {
      next(error);
    }
  };
  getQuizById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;

      const quiz = await quizServise.getQuizById(id);
      res.status(200).json(quiz);
    } catch (error) {
      next(error);
    }
  };
  createQuiz = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { data } = req.body;
      const quizes = await quizServise.createQuiz(data);
      res.status(201).json(quizes);
    } catch (error) {
      next(error);
    }
  };
  updeteQuiz = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { data } = req.body;
      const quizes = await quizServise.updeteQuiz(id, data);
      res.status(201).json(quizes);
    } catch (error) {
      next(error);
    }
  };
  getResult = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const result = await quizServise.getResult(id);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
  createResult = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { time, answerdata } = req.body;
      const result = await quizServise.createResult(id, time, answerdata);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default new QuizController();
