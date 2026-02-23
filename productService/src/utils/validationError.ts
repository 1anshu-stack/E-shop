import { AppError } from "./appError";

export class ValidationError extends AppError {
  private errors: any;

  constructor(errors: any){
    super("Validation Failed", 422)
    this.errors = errors;
  }

}