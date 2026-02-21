import { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { NotFound, TooManyRequest } from "../utils/httpErrors";


const rateLimiter = new RateLimiterMemory({
  points: 1,
  duration: 1
})


export const rateLimit = async (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  try {
    if(!req.ip){
      throw NotFound("There is no ip address present")
    }

    await rateLimiter.consume(req.ip);
    next();
  } catch (error) {
    throw TooManyRequest("Too many requests")
  }
}