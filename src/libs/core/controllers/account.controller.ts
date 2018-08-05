import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Permissions } from '../decorators/permissions.decorator';
import { Roles } from '../decorators/roles.decorator';
import { InAccountDto } from '../dto/in-account.dto';
import { OutAccountDto } from '../dto/out-account.dto';
import { User } from '../entities/user.entity';
import { AccessGuard } from '../guards/access.guard';
import { AccountService } from '../services/account.service';

@ApiUseTags('account')
@Controller('/api/account')
@UseGuards(AccessGuard)
export class AccountController {
  constructor(private accountService: AccountService) {}
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
