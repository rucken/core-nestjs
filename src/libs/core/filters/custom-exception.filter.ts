import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { JsonWebTokenError } from 'jsonwebtoken';
import { CORE_CONFIG_TOKEN, ICoreConfig } from '../configs/core.config';
import { CustomValidationError } from '../exceptions/custom-validation.error';
import { CustomError } from '../exceptions/custom.error';

@Catch(SyntaxError, CustomValidationError, CustomError, JsonWebTokenError, HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
    constructor(
        @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig
    ) {

    }
    private response(
        exception: CustomValidationError | JsonWebTokenError | SyntaxError | Error | HttpException,
        host: ArgumentsHost,
        data: any,
        status?: number
    ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        if (this.coreConfig.debug) {
            // tslint:disable-next-line:no-console
            console.log(exception);
        }
        if (
            request.originalUrl.indexOf('/api/') !== 0 &&
            request.accepts('html') &&
            this.coreConfig.indexFile
        ) {
            response.sendFile(this.coreConfig.indexFile);
        } else {
            response.status(status ? status : HttpStatus.BAD_REQUEST).json(data);
        }
    }
    catch(exception: CustomValidationError | JsonWebTokenError | SyntaxError | Error | HttpException, host: ArgumentsHost) {
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
            this.response(
                exception,
                host,
                {
                    validationErrors: errors
                }
            );
        }
        if (exception instanceof JsonWebTokenError) {
            this.response(
                exception,
                host,
                {
                    message: 'Invalid token'
                }
            );
        }
        if (exception instanceof CustomError) {
            this.response(
                exception,
                host,
                {
                    message: exception.message
                }
            );
        }
        if (exception instanceof SyntaxError) {
            this.response(
                exception,
                host,
                {
                    message: 'Syntax error'
                }
            );
        }
        if (exception instanceof HttpException) {
            this.response(
                exception,
                host,
                {
                    message: exception.message && exception.message.message ? exception.message.message : 'Http exception'
                },
                exception.getStatus()
            );
        }
    }
}