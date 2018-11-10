import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategySignIn extends PassportStrategy(Strategy, 'signin') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    });
  }
  public async validate(req, email: string, password: string) {
    const { user } = await this.authService.signIn({ email, password });
    return user;
  }
}
// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class LocalStrategySignUp extends PassportStrategy(Strategy, 'signup') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    });
  }
  public async validate(req, email: string, password: string) {
    if (req.user) {
      return req.user;
    }
    const { user } = await this.authService.signUp({
      email,
      password,
      username: req.body.username
    });
    return user;
  }
}
