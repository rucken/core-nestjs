import {
  BadRequestException,
  ConflictException,
  HttpService,
  Inject,
  Injectable,
  Logger
} from '@nestjs/common';
import {
  CORE_CONFIG_TOKEN,
  CustomError,
  GroupsService,
  ICoreConfig,
  User,
  UsersService
} from '@rucken/core-nestjs';
import { plainToClass } from 'class-transformer';
import { stringify } from 'querystring';
import { map } from 'rxjs/operators';
import { FACEBOOK_CONFIG_TOKEN } from '../configs/facebook.config';
import { GOOGLE_PLUS_CONFIG_TOKEN } from '../configs/google-plus.config';
import { SignInDto } from '../dto/sign-in.dto';
import { RedirectUriDto } from '../dto/redirect-uri.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { IFacebookConfig } from '../interfaces/facebook-config.interface';
import { IGooglePlusConfig } from '../interfaces/google-plus-config.interface';
@Injectable()
export class AuthService {
  private url: string;

  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    @Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig,
    @Inject(GOOGLE_PLUS_CONFIG_TOKEN)
    private readonly googlePlusConfig: IGooglePlusConfig,
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService
  ) {
    if (this.coreConfig.externalPort) {
      this.url = `${this.coreConfig.protocol}://${this.coreConfig.domain}:${
        this.coreConfig.externalPort
        }`;
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
  async signIn(options: SignInDto) {
    try {
      const { user } = await this.usersService.findByEmail(options);
      if (!(await user.validatePassword(options.password))) {
        throw new CustomError('Wrong password');
      }
      return await this.usersService.update({ id: user.id, item: user });
    } catch (error) {
      throw error;
    }
  }
  async signUp(options: SignUpDto) {
    try {
      await this.groupsService.preloadAll();
    } catch (error) {
      throw new BadRequestException('Error in load groups');
    }
    if (options.email) {
      try {
        const userOfEmail: { user } = await this.usersService.findByEmail(
          options
        );
        throw new ConflictException(
          `User with email "${options.email}" is exists`
        );
      } catch (error) { }
    }
    if (options.username) {
      try {
        const userOfUsername: { user } = await this.usersService.findByUserName(
          options
        );
        throw new ConflictException(
          `User with username "${options.username}" is exists`
        );
      } catch (error) { }
    }
    const group = this.groupsService.getGroupByName({ name: 'user' });
    const newUser = await plainToClass(User, options).setPassword(
      options.password
    );
    newUser.groups = [group];
    return this.usersService.create({ item: newUser });
  }
  async requestFacebookRedirectUri(): Promise<RedirectUriDto> {
    const queryParams: string[] = [
      `client_id=${this.fbConfig.client_id}`,
      `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
      `state=${this.fbConfig.state}`
    ];
    const redirect_uri: string = `${
      this.fbConfig.login_dialog_uri
      }?${queryParams.join('&')}`;
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
    const uri: string = `${this.fbConfig.access_token_uri}?${queryParams.join(
      '&'
    )}`;
    try {
      const response = await this.httpService
        .get(uri)
        .pipe(map(res => res.data))
        .toPromise();
      if (response.error) {
        Logger.error(JSON.stringify(response), undefined, AuthService.name);
        throw new BadRequestException(response.error.message);
      }
      const access_token = response.access_token;
      const uriToken = `${this.url}/api/auth/facebook/token`;
      const profileResponse = await this.httpService
        .post(uriToken, stringify({ access_token }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .pipe(map(res => res.data))
        .toPromise();
      Logger.log(
        JSON.stringify(profileResponse),
        AuthService.name + ':facebookSignIn'
      );
      if (profileResponse.error) {
        Logger.error(
          JSON.stringify(profileResponse),
          undefined,
          AuthService.name
        );
        throw new BadRequestException(profileResponse.error.message);
      }
      return profileResponse;
    } catch (error) {
      Logger.error(
        JSON.stringify(error.response.data),
        undefined,
        AuthService.name
      );
      throw new BadRequestException(error.response.data.error.message);
    }
  }
  async requestGoogleRedirectUri(): Promise<RedirectUriDto | any> {
    const queryParams: string[] = [
      `client_id=${this.googlePlusConfig.client_id}`,
      `redirect_uri=${this.googlePlusConfig.oauth_redirect_uri}`,
      `response_type=${this.googlePlusConfig.response_type}`,
      `scope=${this.googlePlusConfig.scopes.join(' ')}`
    ];
    const redirect_uri: string = `${
      this.googlePlusConfig.login_dialog_uri
      }?${queryParams.join('&')}`;
    Logger.log(redirect_uri, AuthService.name + ':requestGoogleRedirectUri');
    return {
      redirect_uri
    };
  }
  async googleSignIn(code: string): Promise<any> {
    const formData: any = {
      code,
      client_id: this.googlePlusConfig.client_id,
      client_secret: this.googlePlusConfig.client_secret,
      redirect_uri: this.googlePlusConfig.oauth_redirect_uri,
      grant_type: this.googlePlusConfig.grant_type
    };
    const uri: string = this.googlePlusConfig.access_token_uri;
    try {
      const response = await this.httpService
        .post(uri, stringify(formData), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .pipe(map(res => res.data))
        .toPromise();
      if (response.error) {
        Logger.error(JSON.stringify(response), undefined, AuthService.name);
        throw new BadRequestException(response.error_description);
      }
      const access_token = response.access_token;
      const uriToken = `${this.url}/api/auth/google/token`;
      const profileResponse = await this.httpService
        .post(uriToken, stringify({ access_token }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .pipe(map(res => res.data))
        .toPromise();
      Logger.log(
        JSON.stringify(profileResponse),
        AuthService.name + ':googleSignIn'
      );
      if (profileResponse.error) {
        Logger.error(
          JSON.stringify(profileResponse),
          undefined,
          AuthService.name
        );
        throw new BadRequestException(profileResponse.error_description);
      }
      return profileResponse;
    } catch (error) {
      Logger.error(
        JSON.stringify(error.response.data),
        undefined,
        AuthService.name
      );
      throw new BadRequestException(error.response.data.error_description);
    }
  }
}
