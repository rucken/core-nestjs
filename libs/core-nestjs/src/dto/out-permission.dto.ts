import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PermissionDto } from '../dto/permission.dto';

export class OutPermissionDto {
  @Type(() => PermissionDto)
  @ApiProperty({ type: PermissionDto })
  permission: PermissionDto;
}
