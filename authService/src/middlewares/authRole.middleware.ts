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
  return(req: Request, res: Response, next: NextFunction) => {
    const authRequest = req as AuthenticatedRequest;

    if (!authRequest.user) {
      throw Forbidden("Developer Error: roleBasedAuth used without authMiddleware");
    }

    if(!roles.includes(authRequest.user.role)){
      throw Forbidden("Access denied")
    }

    next();
  }
}