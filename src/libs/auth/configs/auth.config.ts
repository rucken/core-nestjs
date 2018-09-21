// workaround: wrong inject token
import { IAuthConfig } from '../interfaces/auth-config.interface';

export const defaultAuthConfig: IAuthConfig = {
  debug: false,
  demo: false,
  port: 5000,
  protocol: 'http',
  domain: 'localhost'
};
export const AUTH_CONFIG_TOKEN: string = 'AuthConfigToken';
