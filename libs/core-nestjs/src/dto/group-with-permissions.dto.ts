import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { PermissionDto } from '../dto/permission.dto';

export class GroupWithPermissionsDto {
  @ApiProperty({ type: Number })
  id: number;

  @MaxLength(100)
  @ApiProperty()
  name: string;

  @MaxLength(255)
  @ApiProperty()
  title: string;

  @Type(() => PermissionDto)
  @ApiProperty({ type: PermissionDto, isArray: true })
  permissions: PermissionDto[];
}
