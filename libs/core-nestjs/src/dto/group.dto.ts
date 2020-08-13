import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class GroupDto {
  @ApiProperty({ type: Number })
  id: number;

  @MaxLength(100)
  @ApiProperty()
  name: string;

  @MaxLength(255)
  @ApiProperty()
  title: string;
}
