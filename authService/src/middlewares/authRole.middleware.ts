import { Request, Response, NextFunction } from "express";
import { Forbidden } from "../utils/httpErrors";


interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: string;
  };
}

export const roleBasedAuth = (
  ...roles: string[]
) => {
  return(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if(!roles.includes(req.user.role)){
      throw Forbidden("Access denied")
    }

    next();
  }
}