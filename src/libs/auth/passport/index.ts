import { FacebookStrategy } from './facebook.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategySignIn, LocalStrategySignUp } from './local.strategy';
import { GooglePlusStrategy } from './google-plus.strategy';

export const passportStrategies = [
  LocalStrategySignIn,
  LocalStrategySignUp,
  JwtStrategy,
  FacebookStrategy,
  GooglePlusStrategy
];
