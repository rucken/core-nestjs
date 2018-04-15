import { ValidationError } from "class-validator";
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends Error {
    constructor(error: string) {
        super(error);
    }
}