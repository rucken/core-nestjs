import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { use } from 'passport';

import { USER_MODEL_TOKEN, TWITTER_CONFIG_TOKEN } from '../../../server.constants';
import { IUser } from '../../user/interfaces/user.interface';
import { ITwitterConfig } from '../interfaces/twitter-config.interface';

const TwitterTokenStrategy = require('passport-twitter-token');

@Injectable()
export class TwitterStrategy {
  constructor(
    @Inject(TWITTER_CONFIG_TOKEN) private readonly twitterConfig: ITwitterConfig,
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>
  ) {
    this.init();
  }

  private init(): void {
    use('twitter', new TwitterTokenStrategy({
      consumerKey: this.twitterConfig.consumer_key,
      consumerSecret: this.twitterConfig.consumer_secret
    }, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
      try {
        const existingUser: IUser = await this.userModel.findOne({ 'twitter.id': profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const { id, username, displayName } = profile;
        const user: IUser = new this.userModel({
          method: 'twitter',
          roles: ['user'],
          twitter: {
            id,
            username,
            displayName,
          }
        });

        done(null, await user.save());
      } catch (err) {
        done(err, null);
      }
    }));
  }
}
