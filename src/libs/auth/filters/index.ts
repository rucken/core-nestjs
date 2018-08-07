import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from '../filters/custom-exception.filter';

export const appFilters = [
  { provide: APP_FILTER, useClass: CustomExceptionFilter }
];
