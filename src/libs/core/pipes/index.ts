import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '../pipes/validation.pipe';

export const appPipes = [{ provide: APP_PIPE, useClass: ValidationPipe }];
