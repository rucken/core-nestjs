import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { GroupDto } from '../dto/group.dto';

export class UserDto {
  @ApiProperty({ type: Number })
  id: number;

  @Exclude()
  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional({ type: String })
  lastLogin: Date;

  @ApiPropertyOptional({ type: Boolean })
  isSuperuser: boolean;

  @MaxLength(150)
  @ApiProperty()
  username: string;

  @MaxLength(30)
  @ApiProperty()
  firstName: string;

  @MaxLength(30)
  @ApiProperty()
  lastName: string;

  @MaxLength(254)
  @ApiProperty()
  email: string;

  @ApiPropertyOptional({ type: Boolean })
  isStaff: boolean;

  @ApiPropertyOptional({ type: Boolean })
  isActive: boolean;

  @ApiProperty({ type: String })
  dateJoined: Date;

  @ApiPropertyOptional({ type: String })
  dateOfBirth: Date;

  @Type(() => GroupDto)
  @ApiProperty({ type: GroupDto, isArray: true })
  groups: GroupDto[];
}
