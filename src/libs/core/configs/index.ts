import { authConfig, AUTH_CONFIG_TOKEN } from './auth.config';
import { coreConfig, CORE_CONFIG_TOKEN } from './core.config';

export const configs = [
    { provide: CORE_CONFIG_TOKEN, useValue: coreConfig },
    { provide: AUTH_CONFIG_TOKEN, useValue: authConfig }
];