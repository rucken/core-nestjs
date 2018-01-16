import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type, Expose, Exclude } from 'class-transformer';
import { IsOptional, MaxLength, IsEmail } from 'class-validator';

import { GroupDto } from './group.dto';
import { UserDto } from './user.dto';

export class InAccountDto {

    @IsOptional()
    id: number;

    @IsEmail()
    @MaxLength(254)
    @ApiModelProperty()
    email: string;

    @Exclude()
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