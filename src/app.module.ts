import { Module } from '@nestjs/common';
import { ParkingModule } from './parking/parking.module';
import { CarModule } from './car/car.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, CarModule, ParkingModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
