import { APP_GUARD } from '@nestjs/core';
import { AccessGuard } from './access.guard';

export const AUTH_APP_GUARDS = [{ provide: APP_GUARD, useClass: AccessGuard, multi: true }];
