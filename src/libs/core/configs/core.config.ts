import { ICoreConfig } from '../interfaces/core-config.interface';

export const defaultCoreConfig: ICoreConfig = {
  debug: false,
  demo: false,
  port: 5000,
  protocol: 'http',
  domain: 'localhost'
};
export const CORE_CONFIG_TOKEN: string = 'CoreConfigToken';
