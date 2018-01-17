import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, MaxLength } from 'class-validator';

import { GroupDto } from './group.dto';
import { UserDto } from './user.dto';

export class InUserDto extends UserDto {

}