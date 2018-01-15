import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class InAccountLoginDto {

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(254)
    @ApiModelProperty()
    email: string;

    @IsNotEmpty()
    @MaxLength(128)
    @ApiModelProperty()
    password: string;
}