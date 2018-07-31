
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './validation.pipe';

export const appPipes = [
    { provide: APP_PIPE, useClass: ValidationPipe }
];