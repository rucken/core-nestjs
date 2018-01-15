import { HttpException } from '@nestjs/common';
import {
    PipeTransform,
    Pipe,
    ArgumentMetadata,
    HttpStatus,
} from '@nestjs/common';

@Pipe()
export class ParseIntWithDefaultPipe implements PipeTransform<string> {
    constructor(private readonly defaultValue: number) {

    }
    async transform(value: string, metadata: ArgumentMetadata) {
        let val = parseInt(value, 10);
        if (isNaN(val)) {
            val = this.defaultValue;
        }
        return val;
    }
}