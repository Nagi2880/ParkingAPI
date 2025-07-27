import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma.service'; 
@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService) {}
  
  create(createCarDto: CreateCarDto) {
    const newCar = this.prisma.car.create({
      data: {
        userId: createCarDto.userId,
        plate: createCarDto.plate,
        brand: createCarDto.brand,
        model: createCarDto.model,
        color: createCarDto.color,
        year: createCarDto.year,
        fabricNumber: createCarDto.fabricNumber,
      }
    });
    return newCar
  }

  findAll() {
    return `This action returns all car`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
