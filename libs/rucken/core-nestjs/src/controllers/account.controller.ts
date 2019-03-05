import { Body, Controller, HttpCode, HttpStatus, Inject, MethodNotAllowedException, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CORE_CONFIG_TOKEN } from '../configs/core.config';
import { Permissions } from '../decorators/permissions.decorator';
import { Roles } from '../decorators/roles.decorator';
import { InAccountDto } from '../dto/in-account.dto';
import { OutAccountDto } from '../dto/out-account.dto';
import { User } from '../entities/user.entity';
import { ICoreConfig } from '../interfaces/core-config.interface';
import { AccountService } from '../services/account.service';

@ApiUseTags('account')
@Controller('/api/account')
export class AccountController {
  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    private accountService: AccountService
  ) {}

  @ApiBearerAuth()
  @Roles('isActive')
  @Permissions('change_profile')
  @HttpCode(HttpStatus.OK)
  @Post('/update')
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutAccountDto,
    description: ''
  })
  async update(@Req() req, @Body() accountDto: InAccountDto) {
    if (this.coreConfig.demo) {
      throw new MethodNotAllowedException('Not allowed in DEMO mode');
    }
    try {
      return plainToClass(
        OutAccountDto,
        await this.accountService.update({
          id: req.user && req.user.id,
          user: plainToClass(User, accountDto)
        })
      );
    } catch (error) {
      throw error;
    }
  }
}
