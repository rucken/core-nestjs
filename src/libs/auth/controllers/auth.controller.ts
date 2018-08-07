import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { UserTokenDto } from '../dto/user-token.dto';
import { FacebookSignInDto } from '../dto/facebook-signIn.dto';
import { FacebookTokenDto } from '../dto/facebook-token.dto';
import { GooglePlusSignInDto } from '../dto/google-plus-signIn.dto';
import { LoginDto } from '../dto/login.dto';
import { RedirectUriDto } from '../dto/redirect-uri.dto';
import { RegisterDto } from '../dto/register.dto';
import { TokenDto } from '../dto/token.dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { OutAccountDto, OutUserDto } from '@rucken/core-nestjs';
import { JsonWebTokenError } from 'jsonwebtoken';

@ApiUseTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) { }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserTokenDto,
    description:
      'API View that checks the veracity of a token, returning the token if it is valid.'
  })
  async requestJsonWebTokenAfterLogin(
    @Req() req,
    @Body() loginDto: LoginDto
  ): Promise<UserTokenDto> {
    const token = await this.tokenService.create(req.user);
    return plainToClass(UserTokenDto, { user: req.user, token });
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserTokenDto,
    description: `API View that receives a POST with a user's username and password.
        Returns a JSON Web Token that can be used for authenticated requests.`
  })
  async requestJsonWebTokenAfterRegister(
    @Req() req,
    @Body() registerDto: RegisterDto
  ): Promise<UserTokenDto> {
    const token = await this.tokenService.create(req.user);
    return plainToClass(UserTokenDto, { user: req.user, token });
  }
  @HttpCode(HttpStatus.OK)
  @Post('info')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserTokenDto,
    description:
      'API View that checks the veracity of a token, returning the token if it is valid.'
  })
  async requestJsonWebTokenAfterInfo(
    @Req() req,
    @Body() tokenDto: TokenDto
  ): Promise<OutAccountDto> {
    try {
      const validateTokenResult = await this.tokenService.validate(tokenDto.token);
      if (validateTokenResult) {
        const jwtPayload: IJwtPayload = await this.tokenService.decode(tokenDto.token);
        const { user } = await this.authService.info({ id: jwtPayload.id });
        return plainToClass(OutAccountDto, { user });
      } else {
        throw new JsonWebTokenError('invalid token');
      }
    } catch (error) {
      throw error;
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'facebook/uri'
  })
  @Get('facebook/uri')
  async requestFacebookRedirectUrl(): Promise<RedirectUriDto> {
    return this.authService.requestFacebookRedirectUri();
  }
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'facebook/signin'
  })
  @Post('facebook/signin')
  async facebookSignIn(
    @Body() facebookSignInDto: FacebookSignInDto
  ): Promise<UserTokenDto> {
    return this.authService.facebookSignIn(facebookSignInDto.code);
  }
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'facebook/token'
  })
  @Post('facebook/token')
  async requestJsonWebTokenAfterFacebookSignIn(
    @Req() req,
    @Body() facebookTokenDto: FacebookTokenDto
  ): Promise<UserTokenDto> {
    const token = await this.tokenService.create(req.user);
    return plainToClass(UserTokenDto, { user: req.user, token });
  }
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'google/uri'
  })
  @Get('google/uri')
  async requestGoogleRedirectUri(): Promise<RedirectUriDto> {
    return this.authService.requestGoogleRedirectUri();
  }
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'google/signin'
  })
  @Post('google/signin')
  async googleSignIn(
    @Body() googleSignInDto: GooglePlusSignInDto
  ): Promise<any> {
    return this.authService.googleSignIn(googleSignInDto.code);
  }
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'google/token'
  })
  @Post('google/token')
  async requestJsonWebTokenAfterGoogleSignIn(@Req() req): Promise<UserTokenDto> {
    const token = await this.tokenService.create(req.user);
    return plainToClass(UserTokenDto, { user: req.user, token });
  }
}
