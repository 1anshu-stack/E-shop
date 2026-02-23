import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../utils/validationError";


export const validate = 
  (schema: ZodObject<any>) => 
  (req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params
      }
    );

    if(!result.success){
      throw new ValidationError(result.error.flatten());
    }

    Object.assign(req.body, result.data.body);
    Object.assign(req.query, result.data.query);
    Object.assign(req.params, result.data.params);

    next();
  }