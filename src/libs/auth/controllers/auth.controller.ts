import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { AccountTokenDto } from '../dto/account-token.dto';
import { FacebookSignInDto } from '../dto/facebook-signIn.dto';
import { GoogleSignInDto } from '../dto/google-signIn.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { TokenDto } from '../dto/token.dto';
import { TwitterSignInDto } from '../dto/twitter-signIn.dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { User } from '@rucken/core-nestjs';
import { FacebookTokenDto } from '../dto/facebook-token.dto';

@ApiUseTags('auth')
@Controller('/api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly tokenService: TokenService
    ) {
    }
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiResponse({
        status: HttpStatus.OK, type: AccountTokenDto,
        description: 'API View that checks the veracity of a token, returning the token if it is valid.'
    })
    async requestJsonWebTokenAfterLocalSignIn(@Req() req, @Body() loginDto: LoginDto): Promise<AccountTokenDto> {
        const token = await this.tokenService.create(req.user);
        return plainToClass(AccountTokenDto, { user: req.user, token });
    }
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    @ApiResponse({
        status: HttpStatus.OK, type: AccountTokenDto,
        description: `API View that receives a POST with a user's username and password.
        Returns a JSON Web Token that can be used for authenticated requests.`
    })
    async requestJsonWebTokenAfterLocalSignUp(@Req() req, @Body() registerDto: RegisterDto): Promise<AccountTokenDto> {
        const token = await this.tokenService.create(req.user);
        return plainToClass(AccountTokenDto, { user: req.user, token });
    }
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'facebook/uri'
    })
    @Get('facebook/uri')
    async requestFacebookRedirectUrl(): Promise<{ redirect_uri: string }> {
        return await this.authService.requestFacebookRedirectUri();
    }
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'facebook/signin'
    })
    @Post('facebook/signin')
    async facebookSignIn(@Body() facebookSignInDto: FacebookSignInDto): Promise<TokenDto> {
        return await this.authService.facebookSignIn(facebookSignInDto.code);
    }
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'facebook/token'
    })
    @Post('facebook/token')
    async requestJsonWebTokenAfterFacebookSignIn(@Req() req, @Body() facebookTokenDto: FacebookTokenDto): Promise<TokenDto> {
        const token = await this.tokenService.create(req.user);
        return plainToClass(AccountTokenDto, { user: req.user, token });
    }
    /*
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'twitter/uri'
    })
    @Get('twitter/uri')
    async requestTwitterRedirectUri(): Promise<any> {
        return await this.authService.requestTwitterRedirectUri();
    }
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'twitter/signin'
    })
    @Post('twitter/signin')
    async twitterSignIn(@Body() twitterSignInDto: TwitterSignInDto): Promise<any> {
        return await this.authService.twitterSignIn(twitterSignInDto.oauth_token, twitterSignInDto.oauth_verifier);
    }
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'twitter/token'
    })
    @Post('twitter/token')
    async requestJsonWebTokenAfterTwitterSignIn(@Req() req): Promise<TokenDto> {
        const token = await this.tokenService.create(req.user);
        return plainToClass(AccountTokenDto, { user: req.user, token });
    }
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'google/uri'
    })
    @Get('google/uri')
    async requestGoogleRedirectUri(): Promise<any> {
        return await this.authService.requestGoogleRedirectUri();
    }
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'google/signin'
    })
    @Post('google/signin')
    async googleSignIn(@Body() googleSignInDto: GoogleSignInDto): Promise<any> {
        return await this.authService.googleSignIn(googleSignInDto.code);
    }
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'google/token'
    })
    @Post('google/token')
    async requestJsonWebTokenAfterGoogleSignIn(@Req() req): Promise<TokenDto> {
        const token = await this.tokenService.create(req.user);
        return plainToClass(AccountTokenDto, { user: req.user, token });
    }
    */
}
