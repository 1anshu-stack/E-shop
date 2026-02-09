import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { ValidationError } from "../utils/validationError";



export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {

  if(err instanceof ValidationError){
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors
    })
  }

  // Known (expected) errors
  if(err instanceof AppError){
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    })
  }

  // Unknown / programming errors
  console.error("UNEXPECTED ERROR:", err);

  
  return res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later"
  })
}