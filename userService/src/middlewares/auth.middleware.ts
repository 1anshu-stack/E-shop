import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../utils/httpError";


interface jwtPayload {
  sub: string,
  role: string
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw Unauthorized("Token is not present");
  }

  const parts = authHeader.split(" ");
  // console.log(parts)

  if(parts.length!=2 || parts[0].toLowerCase()!== "bearer"){
    throw Unauthorized("Invalid authorization header");
  }

  const token = parts[1];

  if (!process.env.JWT_ACCESS_SECRET) {
    throw Unauthorized("JWT secret is not defined");
  }

  try {
    const tokenInfo = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as jwtPayload;
    // console.log("insideAuthMiddleware",tokenInfo);
    req.user = tokenInfo;
    next();
  } catch (error) {
    throw Unauthorized("Token is not valid");
  }
}