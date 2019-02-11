import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { GroupDto } from '../dto/group.dto';

export class UserDto {
  @ApiModelProperty({ type: Number })
  id: number;

  @Exclude()
  @ApiModelPropertyOptional()
  password: string;

  @ApiModelPropertyOptional({ type: String })
  lastLogin: Date;

  @ApiModelPropertyOptional({ type: Boolean })
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

  @ApiModelPropertyOptional({ type: Boolean })
  isStaff: boolean;

  @ApiModelPropertyOptional({ type: Boolean })
  isActive: boolean;

  @ApiModelProperty({ type: String })
  dateJoined: Date;

  @ApiModelPropertyOptional({ type: String })
  dateOfBirth: Date;

  @Type(() => GroupDto)
  @ApiModelProperty({ type: GroupDto, isArray: true })
  groups: GroupDto[];
}
