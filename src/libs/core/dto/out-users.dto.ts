import { Type } from 'class-transformer';

import { MetaDto } from './meta.dto';
import { UserDto } from './user.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class OutUsersDto {
    @Type(() => UserDto)
    @ApiModelProperty({ type: UserDto, isArray: true })
    users: UserDto[];
    @Type(() => MetaDto)
    @ApiModelProperty({ type: MetaDto })
    meta: MetaDto;
}