import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy {
  constructor(private readonly authService: AuthService) {
    this.init();
  }
  private init(): void {
    use(
      'signin',
      new Strategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true
        },
        async (req, email: string, password: string, done) => {
          try {
            const { user } = await this.authService.signIn({ email, password });
            done(null, user);
          } catch (error) {
            done(error, false);
          }
        }
      )
    );
    use(
      'signup',
      new Strategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true
        },
        async (req, email: string, password: string, done) => {
          try {
            const { user } = await this.authService.signUp({
              email,
              password,
              username: req.body.username
            });
            done(null, user);
          } catch (error) {
            done(error, false);
          }
        }
      )
    );
  }
}
