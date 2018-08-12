import { Inject, Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { use } from 'passport';
import * as GoogleTokenStrategy from 'passport-google-plus-token';
import { GOOGLE_PLUS_CONFIG_TOKEN } from '../configs/google-plus.config';
import { SignUpDto } from '../dto/sign-up.dto';
import { OauthTokensAccesstoken } from '../entities/oauth-tokens-accesstoken.entity';
import { IGooglePlusConfig } from '../interfaces/google-plus-config.interface';
import { AuthService } from '../services/auth.service';
import { OauthTokensAccesstokensService } from '../services/oauth-tokens-accesstokens.service';

@Injectable()
export class GooglePlusStrategy {
  constructor(
    @Inject(GOOGLE_PLUS_CONFIG_TOKEN)
    private readonly googlePlusConfig: IGooglePlusConfig,
    private readonly oauthTokensAccesstokensService: OauthTokensAccesstokensService,
    private readonly authService: AuthService
  ) {
    this.init();
  }

  private init(): void {
    use(
      'google',
      new GoogleTokenStrategy(
        {
          clientID: this.googlePlusConfig.client_id,
          clientSecret: this.googlePlusConfig.client_secret
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done
        ) => {
          Logger.log(JSON.stringify(profile), GooglePlusStrategy.name);
          if (!profile.id) {
            done(null, null);
          }
          try {
            try {
              const {
                oauthTokensAccesstoken
              } = await this.oauthTokensAccesstokensService.findByProviderClientId(
                { id: profile.id }
              );
              const { user } = await this.authService.info({
                id: oauthTokensAccesstoken.user.id
              });
              done(null, user);
            } catch (err) {
              const email =
                profile.emails &&
                profile.emails.length &&
                profile.emails[0].value
                  ? profile.emails[0].value
                  : `${profile.id}@google.com`;
              const username = `google_${profile.id}`;
              const firstName = profile.name
                ? profile.name.givenName
                : `google_${profile.id}`;
              const lastName = profile.name
                ? profile.name.familyName
                : `google_${profile.id}`;
              const password = `google_${profile.id}`;
              const { user } = await this.authService.signUp(
                plainToClass(SignUpDto, {
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
