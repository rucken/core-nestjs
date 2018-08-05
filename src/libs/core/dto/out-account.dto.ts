import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AccountDto } from '../dto/account.dto';

export class OutAccountDto {
  @Type(() => AccountDto)
  @ApiModelProperty({ type: AccountDto })
  user: AccountDto;
}
