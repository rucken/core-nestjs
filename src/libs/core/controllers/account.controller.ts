import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';

import { Roles } from '../decorators/roles.decorator';
import { InAccountLoginDto } from '../dto/in-account-login.dto';
import { InAccountRegisterDto } from '../dto/in-account-register.dto';
import { InAccountDto } from '../dto/in-account.dto';
import { InTokenDto } from '../dto/in-token.dto';
import { OutAccountTokenDto } from '../dto/out-account-token.dto';
import { AccessGuard } from '../guards/access.guard';
import { AccountService } from '../services/account.service';
import { Permissions } from '../decorators/permissions.decorator';

@ApiUseTags('account')
@Controller('/api/account')
@UseGuards(AccessGuard)
export class AccountController {
    constructor(
        private accountService: AccountService
    ) {

    }
    @HttpCode(HttpStatus.OK)
    @Post('/info')
    @ApiResponse({
        status: HttpStatus.OK, type: OutAccountTokenDto,
        description: 'API View that checks the veracity of a token, returning the token if it is valid.'
    })
    async info( @Body() tokenDto: InTokenDto) {
        try {
            return await this.accountService.info(tokenDto);
        } catch (error) {
            throw error;
        }
    }
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    @ApiResponse({
        status: HttpStatus.OK, type: OutAccountTokenDto,
        description: 'API View that checks the veracity of a token, returning the token if it is valid.'
    })
    async login( @Body() accountLoginDto: InAccountLoginDto) {
        try {
            return await this.accountService.login(accountLoginDto);
        } catch (error) {
            throw error;
        }
    }
    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    @ApiResponse({
        status: HttpStatus.OK, type: OutAccountTokenDto,
        description: `API View that receives a POST with a user's username and password.
        Returns a JSON Web Token that can be used for authenticated requests.`
    })
    async register( @Body() accountRegisterDto: InAccountRegisterDto) {
        try {
            return await this.accountService.register(accountRegisterDto);
        } catch (error) {
            throw error;
        }
    }
    @ApiBearerAuth()
    @Roles('isActive')
    @Permissions('change_profile')
    @HttpCode(HttpStatus.OK)
    @Post('/update')
    @ApiResponse({
        status: HttpStatus.OK, type: OutAccountTokenDto,
        description: ''
    })
    async update( @Req() req, @Body() accountDto: InAccountDto) {
        try {
            return await this.accountService.update(req['user'].id, accountDto);
        } catch (error) {
            throw error;
        }
    }
}