import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '../pipes/validation.pipe';

export const CORE_APP_PIPES = [{ provide: APP_PIPE, useClass: ValidationPipe, multi: true }];
