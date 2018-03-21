import { ValidationError } from "class-validator";
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends Error {
    error: string;
    constructor(error: string) {
        super();
        this.error = error;
    }
}