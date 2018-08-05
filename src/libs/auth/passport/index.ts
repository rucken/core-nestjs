import { FacebookStrategy } from './facebook.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { GooglePlusStrategy } from './google-plus.strategy';

export const passportStrategies = [
  LocalStrategy,
  JwtStrategy,
  FacebookStrategy,
  GooglePlusStrategy
];
