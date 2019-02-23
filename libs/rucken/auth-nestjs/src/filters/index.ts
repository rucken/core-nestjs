import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from '../filters/custom-exception.filter';

export const AUTH_APP_FILTERS = [{ provide: APP_FILTER, useClass: CustomExceptionFilter, multi: true }];
