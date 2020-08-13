import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, MaxLength } from 'class-validator';
import { ContentTypeDto } from '../dto/content-type.dto';

export class InPermissionDto {
  @IsOptional()
  id: number;

  @MaxLength(100)
  @ApiProperty()
  name: string;

  @MaxLength(255)
  @ApiProperty()
  title: string;

  @Type(() => ContentTypeDto)
  @ApiProperty({ type: ContentTypeDto })
  contentType: ContentTypeDto;
}
