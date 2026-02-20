import { ZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/validationError';


export const validate = 
  (schema: ZodObject<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

     if (!result.success) {
      throw new ValidationError(result.error.flatten());
    }

    // overwrite with parsed & typed data
    Object.assign(req.body, result.data.body);
 
    next();
  }


