import {
  defaultFacebookConfig,
  FACEBOOK_CONFIG_TOKEN
} from '../configs/facebook.config';
import {
  defaultGooglePlusConfig,
  GOOGLE_PLUS_CONFIG_TOKEN
} from '../configs/google-plus.config';
import { defaultJwtConfig, JWT_CONFIG_TOKEN } from '../configs/jwt.config';
import { defaultAuthConfig, AUTH_CONFIG_TOKEN } from './auth.config';

export const configs = [
  {
    provide: AUTH_CONFIG_TOKEN,
    useValue: defaultAuthConfig
  },
  {
    provide: JWT_CONFIG_TOKEN,
    useValue: defaultJwtConfig
  },
  {
    provide: FACEBOOK_CONFIG_TOKEN,
    useValue: defaultFacebookConfig
  },
  {
    provide: GOOGLE_PLUS_CONFIG_TOKEN,
    useValue: defaultGooglePlusConfig
  }
];
