import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";



export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(err instanceof AppError){
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    })
  }

  console.error("UNEXPECTED ERROR:", err);

  
  return res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later"
  })
}