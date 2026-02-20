import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "../utils/httpErrors";
import { verifyToken } from "../utils/token";
import { string } from "zod";


interface jwtPayload {
  sub: string,
  role: string
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // console.log("request", req.headers.authorization);
  const authHeader = req.headers.Authorization;

  if (!authHeader || typeof authHeader !== "string") {
    throw Unauthorized("Access token missing");
  }
  
  const parts = authHeader.split(" ");
  // console.log(parts)

  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    throw Unauthorized("Invalid authorization header");
  }
  
  const jwtToken = parts[1];

  
  try {
    const tokenValid = verifyToken(jwtToken) as jwtPayload;
    req.user = {
      id: tokenValid.sub,
      role: tokenValid.role
    }

    next()
  } catch (error) {
    throw Unauthorized("Invalid or expired access token");
  }
}