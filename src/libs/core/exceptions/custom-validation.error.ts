import { ValidationError } from 'class-validator';

export class CustomValidationError extends Error {
  errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super();
    this.errors = errors;
  }
}
