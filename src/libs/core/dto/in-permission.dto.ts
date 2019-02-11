import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, MaxLength } from 'class-validator';
import { ContentTypeDto } from '../dto/content-type.dto';

export class InPermissionDto {
  @IsOptional()
  id: number;

  @MaxLength(100)
  @ApiModelProperty()
  name: string;

  @MaxLength(255)
  @ApiModelProperty()
  title: string;

  @Type(() => ContentTypeDto)
  @ApiModelProperty({ type: ContentTypeDto })
  contentType: ContentTypeDto;
}
