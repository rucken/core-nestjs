import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class InContentTypeDto {
  @IsOptional()
  id: number;

  @MaxLength(100)
  @ApiProperty()
  name: string;

  @MaxLength(255)
  @ApiProperty()
  title: string;
}
