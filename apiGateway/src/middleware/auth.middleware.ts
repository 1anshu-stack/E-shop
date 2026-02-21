import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "../utils/httpErrors";
import jwt from "jsonwebtoken";


interface JWTtoken {
  sub: string,
  role: string
}


export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    throw Unauthorized("No Token Provided");
  }

  const part = authHeader.split(" ");
  if(part.length !== 2 || part[0].toLowerCase() !== "bearer"){
    throw Unauthorized("Invalid authorization header");
  }

  const token = part[1];

  try {
    const userInfo = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as JWTtoken;
    req.user = userInfo;
    next();
  } catch (error) {
    throw Unauthorized("Invalid token");
  }
}