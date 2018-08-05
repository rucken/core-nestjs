import {
  defaultFacebookConfig,
  FACEBOOK_CONFIG_TOKEN
} from './facebook.config';
import {
  defaultGooglePlusConfig,
  GOOGLE_CONFIG_TOKEN
} from './google-plus.config';
import { defaultJwtConfig, JWT_CONFIG_TOKEN } from './jwt.config';
import { defaultTwitterConfig, TWITTER_CONFIG_TOKEN } from './twitter.config';

export const configs = [
  {
    provide: JWT_CONFIG_TOKEN,
    useValue: defaultJwtConfig
  },
  {
    provide: FACEBOOK_CONFIG_TOKEN,
    useValue: defaultFacebookConfig
  },
  {
    provide: TWITTER_CONFIG_TOKEN,
    useValue: defaultTwitterConfig
  },
  {
    provide: GOOGLE_CONFIG_TOKEN,
    useValue: defaultGooglePlusConfig
  }
];
