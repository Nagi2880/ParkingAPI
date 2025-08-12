import { Module } from '@nestjs/common';
import { ParkingModule } from './parking/parking.module';
import { CarModule } from './car/car.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    CarModule, 
    ParkingModule, 
    AuthModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
