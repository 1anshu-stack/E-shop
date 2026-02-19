import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../utils/httpError";


export interface AuthRequest extends Request {
  user?: any
}

interface jwtPayload {
  sub: string,
  role: string
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw Unauthorized("Token is not present");
  }

  const token = authHeader.split(" ")[1];

  if (!process.env.JWT_ACCESS_SECRET) {
    throw Unauthorized("JWT secret is not defined");
  }

  try {
    const tokenInfo = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as jwtPayload;
    req.user = tokenInfo;
    next();
  } catch (error) {
    throw Unauthorized("Token is not valid");
  }
}