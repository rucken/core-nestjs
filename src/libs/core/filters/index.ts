
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './custom-exception.filter';

export const appFilters = [
    { provide: APP_FILTER, useClass: CustomExceptionFilter }
];