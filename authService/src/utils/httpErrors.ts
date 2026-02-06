import { AppError } from "./appError";


export const BadRequest = (msg: string) => new AppError(msg, 400);
export const Unauthorized = (msg: string) => new AppError(msg, 401);
export const Forbidden = (msg: string) => new AppError(msg, 403);
export const NotFound = (msg: string) => new AppError(msg, 404);
