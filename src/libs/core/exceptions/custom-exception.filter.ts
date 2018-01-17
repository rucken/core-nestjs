import { ExceptionFilter, Catch, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { JsonWebTokenError } from 'jsonwebtoken';
import { CustomValidationError } from './custom-validation.error';

@Catch(SyntaxError, CustomValidationError, JsonWebTokenError, Error)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: CustomValidationError | JsonWebTokenError | SyntaxError | Error, response) {
        const errors = {};
        if (exception instanceof CustomValidationError) {
            if (process.env.DEBUG === 'true' || process.env.DEBUG === '1') {
                response.status(HttpStatus.BAD_REQUEST).json(exception);
                return;
            }
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
            if (process.env.DEBUG === 'true' || process.env.DEBUG === '1') {
                response.status(HttpStatus.BAD_REQUEST).json(exception);
                return;
            }
            response.status(HttpStatus.BAD_REQUEST).json({
                message: exception.message
            });
            return;
        }
        if (exception instanceof SyntaxError || exception instanceof Error) {
            if (process.env.DEBUG === 'true' || process.env.DEBUG === '1') {
                response.status(HttpStatus.BAD_REQUEST).json(exception);
                return;
            }
            response.status(HttpStatus.BAD_REQUEST).json({
                message: exception.message ? exception.message : String(exception)
            });
            return;
        }
    }
}