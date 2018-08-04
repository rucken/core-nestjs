import { Injectable } from '@nestjs/common';
import { CustomError, User } from '@rucken/core-nestjs';
import { use } from 'passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy {
  constructor(
    private readonly authService: AuthService
  ) {
    this.init();
  }
  private init(): void {
    use('login', new Strategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, async (req, email: string, password: string, done) => {
      try {
        const { user } = await this.authService.login({ email, password });
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));
    use('register', new Strategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, async (req, email: string, password: string, done) => {
      try {
        const { user } = await this.authService.register({ email, password, username: req.body.username });
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));
  }
}
