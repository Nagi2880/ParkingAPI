import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingDto } from './create-parking.dto';
import { ParkingStatus } from '@prisma/client';

export class UpdateParkingDto extends PartialType(CreateParkingDto) {
    status?: ParkingStatus;
}
