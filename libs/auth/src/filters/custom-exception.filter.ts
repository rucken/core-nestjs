import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';

@Catch(JsonWebTokenError)
export class CustomExceptionFilter implements ExceptionFilter {
  private response(exception: JsonWebTokenError, host: ArgumentsHost, data: any, status?: number) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    Logger.error(JSON.stringify(exception), undefined, CustomExceptionFilter.name);
    response.status(status ? status : HttpStatus.BAD_REQUEST).json(data);
  }

  catch(exception: JsonWebTokenError, host: ArgumentsHost) {
    if (exception instanceof JsonWebTokenError) {
      this.response(exception, host, {
        message: exception.message
      });
    }
  }
}
