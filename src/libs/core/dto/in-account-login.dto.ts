import { IsEmail, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class InAccountLoginDto {

    @IsOptional()
    @IsEmail()
    @MaxLength(254)
    @ApiModelProperty()
    email: string;

    @IsOptional()
    @MaxLength(150)
    @ApiModelProperty()
    username: string;

    @IsNotEmpty()
    @MaxLength(128)
    @ApiModelProperty()
    password: string;
}