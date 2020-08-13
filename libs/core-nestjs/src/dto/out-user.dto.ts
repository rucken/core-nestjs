import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserDto } from '../dto/user.dto';

export class OutUserDto {
  @Type(() => UserDto)
  @ApiProperty({ type: UserDto })
  user: UserDto;
}
