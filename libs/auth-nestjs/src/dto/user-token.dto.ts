import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AccountDto } from '@rucken/core-nestjs';

export class UserTokenDto {
  @ApiProperty()
  token: string;

  @Type(() => AccountDto)
  @ApiProperty({ type: AccountDto })
  user: AccountDto;
}
