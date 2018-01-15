import { ExceptionFilter, Catch, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { JsonWebTokenError } from 'jsonwebtoken';
import { CustomValidationError } from './custom-validation.error';

@Catch(SyntaxError, CustomValidationError, JsonWebTokenError, Error)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: CustomValidationError | JsonWebTokenError, response) {
        const errors = {};
        if (exception instanceof CustomValidationError) {
            exception.errors.forEach((error: ValidationError) => {
                Object.keys(error.constraints).forEach(
                    (key: string) => {
                        if (!errors[error.property]) {
                            errors[error.property] = [];
                        }
                        errors[error.property].push(error.constraints[key]);
                    }
                );
            });
            response.status(HttpStatus.BAD_REQUEST).json(errors);
            return;
        }
        if (exception instanceof JsonWebTokenError) {
            response.status(HttpStatus.BAD_REQUEST).json({
                nonFieldErrors: [exception.message]
            });
            return;
        }
        if (process.env.DEBUG === 'true' || process.env.DEBUG === '1') {
            console.error(exception);
            response.status(HttpStatus.BAD_REQUEST).json({ message: String(exception) });
            return;
        }
        response.status(HttpStatus.BAD_REQUEST).json(exception);
    }
}