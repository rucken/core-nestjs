import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { AccountDto } from './account.dto';

export class OutAccountTokenDto {

    @ApiModelProperty()
    token: string;

    @Type(() => AccountDto)
    @ApiModelProperty({ type: AccountDto })
    user: AccountDto;
}