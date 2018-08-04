import { FacebookStrategy } from './facebook.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

export const passportStrategies = [
    LocalStrategy,
    JwtStrategy,
    FacebookStrategy
];