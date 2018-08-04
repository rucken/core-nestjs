import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { use } from 'passport';

import { GOOGLE_CONFIG_TOKEN, USER_MODEL_TOKEN } from '../../../server.constants';
import { IGoogleConfig } from '../interfaces/google-config.interface';
import { IUser } from '../../user/interfaces/user.interface';

const GoogleTokenStrategy = require('passport-google-plus-token');

@Injectable()
export class GoogleStrategy {
  constructor(
    @Inject(GOOGLE_CONFIG_TOKEN) private readonly googleConfig: IGoogleConfig,
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>
  ) {
    this.init();
  }

  private init(): void {
    use('google', new GoogleTokenStrategy({
      clientID: this.googleConfig.client_id,
      clientSecret: this.googleConfig.client_secret
    }, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
      try {
        const existingUser: IUser = await this.userModel.findOne({ 'google.id': profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const { id, displayName } = profile;
        const email: string = profile.emails.shift().value;
        const user: IUser = new this.userModel({
          method: 'google',
          roles: ['user'],
          google: {
            id,
            email,
            displayName
          }
        });

        done(null, await user.save());
      } catch (err) {
        done(err, null);
      }
    }));
  }
}
