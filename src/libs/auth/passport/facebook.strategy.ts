import { Inject, Injectable } from '@nestjs/common';
import { OauthTokensAccesstoken } from '@rucken/auth-nestjs/entities/oauth-tokens-accesstoken.entity';
import { plainToClass } from 'class-transformer';
import { use } from 'passport';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { FACEBOOK_CONFIG_TOKEN } from '../configs/facebook.config';
import { RegisterDto } from '../dto/register.dto';
import { IFacebookConfig } from '../interfaces/facebook-config.interface';
import { AuthService } from '../services/auth.service';
import { OauthTokensAccesstokensService } from '../services/oauth-tokens-accesstokens.service';

@Injectable()
export class FacebookStrategy {
  constructor(
    @Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig,
    private readonly oauthTokensAccesstokensService: OauthTokensAccesstokensService,
    private readonly authService: AuthService
  ) {
    this.init();
  }

  private init(): void {
    use(
      'facebook',
      new FacebookTokenStrategy(
        {
          clientID: this.fbConfig.client_id,
          clientSecret: this.fbConfig.client_secret
        },
        async (accessToken: string, refreshToken: string, profile: any, done) => {
          if (!profile.id) {
            done(null, null);
          }
          try {
            try {
              const { oauthTokensAccesstoken } = await this.oauthTokensAccesstokensService.findByProviderClientId({ id: profile.id });
              const { user } = await this.authService.info({ id: oauthTokensAccesstoken.user.id });
              done(null, user);
            } catch (err) {
              const email = `${profile.id}@facebook.com`;
              const username = `facebook_${profile.id}`;
              const firstName = profile.name.givenName;
              const lastName = profile.name.familyName;
              const password = `facebook_${profile.id}`;
              const { user } = await this.authService.register(
                plainToClass(RegisterDto, {
                  email,
                  username,
                  password,
                  firstName,
                  lastName
                })
              );
              const newOauthTokensAccesstoken = new OauthTokensAccesstoken();
              newOauthTokensAccesstoken.user = user;
              newOauthTokensAccesstoken.providerClientId = profile.id;
              newOauthTokensAccesstoken.provider = profile.provider;
              newOauthTokensAccesstoken.accessToken = accessToken;
              await this.oauthTokensAccesstokensService.create({
                item: newOauthTokensAccesstoken
              });
              done(null, user);
            }
          } catch (err) {
            done(err, null);
          }
        }
      )
    );
  }
}