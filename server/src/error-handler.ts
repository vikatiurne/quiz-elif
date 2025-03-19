import { NextFunction, Request, Response } from "express";

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal error server" });
};
