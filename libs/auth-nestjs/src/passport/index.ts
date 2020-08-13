import { FacebookStrategy } from './facebook.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategySignIn, LocalStrategySignUp } from './local.strategy';
import { GooglePlusStrategy } from './google-plus.strategy';

export const AUTH_PASSPORT_STRATEGIES = [
  LocalStrategySignIn,
  LocalStrategySignUp,
  JwtStrategy,
  FacebookStrategy,
  GooglePlusStrategy,
];
