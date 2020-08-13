import { CORE_CONFIG_TOKEN, DEFAULT_CORE_CONFIG } from '../configs/core.config';

export const CORE_CONFIGS = [
  {
    provide: CORE_CONFIG_TOKEN,
    useValue: DEFAULT_CORE_CONFIG,
  },
];
