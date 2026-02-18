import { Request, Response, NextFunction } from "express";
import { Forbidden } from "../utils/httpErrors";


export const roleBasedAuth = (
  ...roles: string[]
) => {
  return(req: Request, res: Response, next: NextFunction) => {
    if(!roles.includes(req?.user.role)){
      throw Forbidden("Access denied")
    }

    next();
  }
}