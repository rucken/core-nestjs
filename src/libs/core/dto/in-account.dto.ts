import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type, Expose } from 'class-transformer';
import { IsOptional, MaxLength } from 'class-validator';

import { GroupDto } from './group.dto';
import { UserDto } from './user.dto';

export class InAccountDto {

    @IsOptional()
    id: number;
    @MaxLength(128)
    @IsOptional()
    @ApiModelPropertyOptional()
    password: string;

    @MaxLength(150)
    @ApiModelProperty()
    username: string;
    @MaxLength(30)
    @ApiModelProperty()
    firstName: string;
    @MaxLength(30)
    @ApiModelProperty()
    lastName: string;
}