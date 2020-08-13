import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MetaDto } from '../dto/meta.dto';
import { UserDto } from '../dto/user.dto';

export class OutUsersDto {
  @Type(() => UserDto)
  @ApiProperty({ type: UserDto, isArray: true })
  users: UserDto[];

  @Type(() => MetaDto)
  @ApiProperty({ type: MetaDto })
  meta: MetaDto;
}
