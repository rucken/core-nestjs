import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { JsonWebTokenError } from 'jsonwebtoken';
import { CustomValidationError } from './custom-validation.error';
import { CustomError } from './custom.error';

@Catch(SyntaxError, CustomValidationError, CustomError, JsonWebTokenError)
export class CustomExceptionFilter implements ExceptionFilter {
    constructor(
        private _indexFile?: string
    ) {

    }
    badRequest(response, request, data: any) {
        if (
            request.originalUrl.indexOf('/api/') !== 0 &&
            request.accepts('html') &&
            this._indexFile
        ) {
            response.sendFile(this._indexFile);
        } else {
            response.status(HttpStatus.BAD_REQUEST).json(data);
        }
    }
    catch(exception: CustomValidationError | JsonWebTokenError | SyntaxError | Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const errors = {};
        if (exception instanceof CustomValidationError) {
            if (process.env.DEBUG === 'true') {
                // tslint:disable-next-line:no-console
                console.log(exception);
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
            this.badRequest(response, request, { validationErrors: errors });
            return;
        }
        if (exception instanceof JsonWebTokenError) {
            if (process.env.DEBUG === 'true') {
                // tslint:disable-next-line:no-console
                console.log(exception);
            }
            this.badRequest(response, request, {
                message: 'Invalid token'
            });
            return;
        }
        if (exception instanceof CustomError) {
            if (process.env.DEBUG === 'true') {
                // tslint:disable-next-line:no-console
                console.log(exception);
            }
            this.badRequest(response, request, {
                message: exception.message
            });
            return;
        }
        if (exception instanceof SyntaxError) {
            if (process.env.DEBUG === 'true') {
                // tslint:disable-next-line:no-console
                console.log(exception);
            }
            this.badRequest(response, request, {
                message: exception.message ? exception.message : String(exception)
            });
            return;
        }
    }
}