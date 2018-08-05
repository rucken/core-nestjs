import { BadRequestException, ConflictException, HttpService, Inject, Injectable, Logger, HttpException } from '@nestjs/common';
import { LoginDto } from '@rucken/auth-nestjs/dto/login.dto';
import { RegisterDto } from '@rucken/auth-nestjs/dto/register.dto';
import { CORE_CONFIG_TOKEN, CustomError, GroupsService, ICoreConfig, User, UsersService } from '@rucken/core-nestjs';
import { plainToClass } from 'class-transformer';
import { stringify } from 'querystring';
import { map, catchError } from 'rxjs/operators';
import { FACEBOOK_CONFIG_TOKEN } from '../configs/facebook.config';
import { GOOGLE_CONFIG_TOKEN } from '../configs/google.config';
import { TWITTER_CONFIG_TOKEN } from '../configs/twitter.config';
import { IFacebookConfig } from '../interfaces/facebook-config.interface';
import { IGoogleConfig } from '../interfaces/google-config.interface';
import { ITwitterConfig } from '../interfaces/twitter-config.interface';
import { from } from '../../../../node_modules/rxjs';
@Injectable()
export class AuthService {
  private url: string;

  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    @Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig,
    @Inject(TWITTER_CONFIG_TOKEN) private readonly twitterConfig: ITwitterConfig,
    @Inject(GOOGLE_CONFIG_TOKEN) private readonly googleConfig: IGoogleConfig,
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService
  ) {
    if (this.coreConfig.externalPort) {
      this.url = `${this.coreConfig.protocol}://${this.coreConfig.domain}:${this.coreConfig.externalPort}`;
    } else {
      this.url = `${this.coreConfig.protocol}://${this.coreConfig.domain}`;
    }
  }
  async info(options: { id: number }) {
    try {
      return await this.usersService.findById(options);
    } catch (error) {
      throw error;
    }
  }
  async login(options: LoginDto) {
    try {
      const { user } = await this.usersService.findByEmail(options);
      if (!await user.validatePassword(options.password)) {
        throw new CustomError('Wrong password');
      }
      return await this.usersService.update({ id: user.id, item: user });
    } catch (error) {
      throw error;
    }
  }
  async register(options: RegisterDto) {
    try {
      await this.groupsService.preloadAll();
    } catch (error) {
      throw new BadRequestException('Error in load groups');
    }
    if (options.email) {
      try {
        const userOfEmail: { user } = await this.usersService.findByEmail(options);
        throw new ConflictException(`User with email "${options.email}" is exists`);
      } catch (error) {
      }
    }
    if (options.username) {
      try {
        const userOfUsername: { user } = await this.usersService.findByUserName(options);
        throw new ConflictException(`User with username "${options.username}" is exists`);
      } catch (error) {
      }
    }
    const group = this.groupsService.getGroupByName({ name: 'user' });
    const newUser = await plainToClass(User, options).setPassword(options.password);
    newUser.groups = [
      group
    ];
    return this.usersService.create({ item: newUser });
  }
  async requestFacebookRedirectUri(): Promise<{ redirect_uri: string }> {
    const queryParams: string[] = [
      `client_id=${this.fbConfig.client_id}`,
      `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
      `state=${this.fbConfig.state}`
    ];
    const redirect_uri: string = `${this.fbConfig.login_dialog_uri}?${queryParams.join('&')}`;
    Logger.log(redirect_uri, AuthService.name + ':requestFacebookRedirectUri');
    return {
      redirect_uri
    };
  }
  async facebookSignIn(code: string): Promise<any> {
    const queryParams: string[] = [
      `client_id=${this.fbConfig.client_id}`,
      `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
      `client_secret=${this.fbConfig.client_secret}`,
      `code=${code}`
    ];
    const uri: string = `${this.fbConfig.access_token_uri}?${queryParams.join('&')}`;
    try {
      const response = await this.httpService.get(uri).pipe(
        map((res) => res.data)
      ).toPromise();
      if (response.error) {
        Logger.error(JSON.stringify(response), AuthService.name);
        throw new BadRequestException(response.error.message);
      }
      const access_token = response.access_token;
      const uriToken = `${this.url}/api/auth/facebook/token`;
      const profileResponse = await this.httpService.post(
        uriToken,
        stringify({ access_token }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      ).pipe(
        map((res) => res.data)
      ).toPromise();
      if (profileResponse.error) {
        Logger.error(JSON.stringify(profileResponse), AuthService.name);
        throw new BadRequestException(profileResponse.error.message);
      }
      return profileResponse;
    } catch (error) {
      Logger.error(JSON.stringify(error.response.data), AuthService.name);
      throw new BadRequestException(error.response.data.error.message);
    }
  }
  /*
    async requestTwitterRedirectUri(): Promise<{ redirect_uri: string } | any> {
      return new Promise((resolve, reject) => {
        Logger.log(this.twitterConfig.request_token_uri, AuthService.name + ':requestTwitterRedirectUri#148');
        post({
          url: this.twitterConfig.request_token_uri,
          oauth: {
            consumer_key: this.twitterConfig.consumer_key,
            consumer_secret: this.twitterConfig.consumer_secret,
            callback: this.twitterConfig.oauth_redirect_uri
          }
        }, async (err: Error, res: Response, body: any) => {
          if (err) {
            return reject(err);
          }
          if (body.error) {
            return reject(body.error);
          }
          const { oauth_token } = this.parseTwitterResponse(body);
          const redirect_uri: string = `${this.twitterConfig.login_dialog_uri}?oauth_token=${oauth_token}`;
          Logger.log(redirect_uri, AuthService.name + ':requestTwitterRedirectUri#165');
          resolve({
            redirect_uri
          });
        });
      });
    }
    async twitterSignIn(oauth_token: string, oauth_verifier: string): Promise<any> {
      return new Promise((resolve, reject) => {
        Logger.log(this.twitterConfig.access_token_uri, AuthService.name + ':twitterSignIn#174');
        post({
          url: this.twitterConfig.access_token_uri,
          oauth: {
            consumer_key: this.twitterConfig.consumer_key,
            consumer_secret: this.twitterConfig.consumer_secret,
            token: oauth_token,
            verifier: oauth_verifier
          }
        }, async (err: Error, res: Response, body: any) => {
          if (err) {
            return reject(err);
          }
          if (body.error) {
            return reject(body.error);
          }
          const { resp_oauth_token, resp_oauth_token_secret, resp_user_id } = this.parseTwitterResponse(body);
          const uriToken = `${this.url}/api/auth/twitter/token`;
          Logger.log(uriToken, AuthService.name + ':twitterSignIn#192');
          post({
            url: uriToken,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
              resp_oauth_token,
              resp_oauth_token_secret,
              resp_user_id
            }
          }, async (resp_err: Error, resp_res: Response, resp_body: any) => {
            if (resp_err) {
              return reject(resp_err);
            }
            if (resp_body.error) {
              return reject(resp_body.error);
            }
            resolve(resp_body);
          });
        });
      });
    }
    async requestGoogleRedirectUri(): Promise<{ redirect_uri: string } | any> {
      const queryParams: string[] = [
        `client_id=${this.googleConfig.client_id}`,
        `redirect_uri=${this.googleConfig.oauth_redirect_uri}`,
        `response_type=${this.googleConfig.response_type}`,
        `scope=${this.googleConfig.scopes.join(' ')}`
      ];
      const redirect_uri: string = `${this.googleConfig.login_dialog_uri}?${queryParams.join('&')}`;
      Logger.log(redirect_uri, AuthService.name + ':requestGoogleRedirectUri#223');
      return {
        redirect_uri
      };
    }
    async googleSignIn(code: string): Promise<any> {
      return new Promise((resolve, reject) => {
        Logger.log(this.googleConfig.access_token_uri, AuthService.name + ':googleSignIn#230');
        post({
          url: this.googleConfig.access_token_uri,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          form: {
            code,
            client_id: this.googleConfig.client_id,
            client_secret: this.googleConfig.client_secret,
            redirect_uri: this.googleConfig.oauth_redirect_uri,
            grant_type: this.googleConfig.grant_type
          }
        }, async (err: Error, res: Response, body: any) => {
          if (err) {
            return reject(err);
          }
          if (body.error) {
            return reject(body.error);
          }
          const { access_token } = JSON.parse(body);
          const uriToken = `${this.url}/api/auth/google/token`;
          Logger.log(uriToken, AuthService.name + ':googleSignIn#252');
          post({
            url: uriToken,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
              access_token
            }
          }, async (resp_err: Error, resp_res: Response, resp_body: any) => {
            if (resp_err) {
              return reject(resp_err);
            }
            if (resp_body.error) {
              return reject(resp_body.error);
            }
            resolve(resp_body);
          });
        });
      });
    }
    private parseTwitterResponse(response: string): { [key: string]: string | boolean } {
      const regex: RegExp = /([a-z_]+?)=([a-zA-Z0-9_-]+)/g;
      const parsedResponse: { [key: string]: string } = {};
      let match: RegExpMatchArray = regex.exec(response);
      while (match) {
        match.shift();
        parsedResponse[match.shift()] = match.shift();
        match = regex.exec(response);
      }
      return parsedResponse;
    }
    */
}
