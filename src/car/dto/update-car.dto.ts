import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {
    plate?: string;
    brand?: string;
    model?: string;
    color?: string;
    year?: number;
    fabricNumber?: string;
}
