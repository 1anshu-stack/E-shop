// utils/validationError.ts
import { AppError } from "./appError";

export class ValidationError extends AppError {
  public errors: any;

  constructor(errors: any) {
    super("Validation failed", 422);
    this.errors = errors;
  }
}
