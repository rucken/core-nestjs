import { IsNotEmpty, MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class GroupDto {

    @ApiModelProperty({ type: Number })
    id: number;
    @MaxLength(100)
    @ApiModelProperty()
    name: string;
    @MaxLength(255)
    @ApiModelProperty()
    title: string;
}