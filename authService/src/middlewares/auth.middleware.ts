import { NextFunction, Request, Response } from "express";
import "../types/express.d.ts";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../utils/httpErrors";
import { verifyToken } from "../utils/token";


interface jwtPayload {
  sub: string,
  role: string
}


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Check if header exists
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    throw Unauthorized("Access token missing")
  }

  // Extract token
  const jwtToken = authHeader.split(" ")[1];


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