import { AppError } from "./appError";


export const BadRequest = (msg: string) => new AppError(msg, 400);
export const Unauthorized = (msg: string) => new AppError(msg, 401);
export const Forbidden = (msg: string) => new AppError(msg, 403);
export const NotFound = (msg: string) => new AppError(msg, 404);
export const validationFailed = (msg: string) => new AppError(msg, 422)
export const TooManyRequest = (msg: string) => new AppError(msg, 429)
