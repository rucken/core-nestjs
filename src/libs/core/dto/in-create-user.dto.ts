import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type, Expose } from 'class-transformer';
import { IsOptional, MaxLength } from 'class-validator';

import { GroupDto } from './group.dto';
import { UserDto } from './user.dto';

export class InCreateUserDto {

    @IsOptional()
    id: number;
    @MaxLength(128)
    @ApiModelPropertyOptional()
    password: string;
    @ApiModelPropertyOptional({ type: String })
    lastLogin: Date;
    @ApiModelProperty({ type: Boolean })
    isSuperuser: boolean;
    @MaxLength(150)
    @ApiModelProperty()
    username: string;
    @MaxLength(30)
    @ApiModelProperty()
    firstName: string;
    @MaxLength(30)
    @ApiModelProperty()
    lastName: string;
    @MaxLength(254)
    @ApiModelProperty()
    email: string;
    @ApiModelProperty({ type: Boolean })
    isStaff: boolean;
    @ApiModelProperty({ type: Boolean })
    isActive: boolean;
    @ApiModelProperty({ type: String })
    dateJoined: Date;
    @ApiModelPropertyOptional({ type: String })
    dateOfBirth: Date;
    @Type(() => GroupDto)
    @ApiModelProperty({ type: GroupDto, isArray: true })
    groups: GroupDto[];
}