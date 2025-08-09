import { Module } from '@nestjs/common';
import { ParkingModule } from './parking/parking.module';
import { CarModule } from './car/car.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { AuthModuleModule } from './auth/auth.module';
import { AuthServiceService } from './auth-service/auth-service.service';

@Module({
  imports: [UserModule, CarModule, ParkingModule, AuthModuleModule],
  controllers: [],
  providers: [PrismaService, AuthServiceService],
})
export class AppModule {}
