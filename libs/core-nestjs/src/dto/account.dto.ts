import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GroupWithPermissionsDto } from '../dto/group-with-permissions.dto';
import { UserDto } from '../dto/user.dto';

export class AccountDto extends UserDto {
  @Type(() => GroupWithPermissionsDto)
  @ApiProperty({ type: GroupWithPermissionsDto, isArray: true })
  groups: GroupWithPermissionsDto[];
}
