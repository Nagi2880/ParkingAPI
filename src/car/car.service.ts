import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma.service'; 
@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createCarDto: CreateCarDto) {
    const newCar = await this.prisma.car.create({
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

  async findAll(id : string) {
    const allcars = await this.prisma.car.findMany({
      where:{
        userId: id
      }
    })
  return allcars;
  }

  async findbyId(id: string) {
    const car =  await this.prisma.car.findUnique({
      where:{ id }
    })
    return car;
  }

  updatemyCar(id: string, userId: string, updateCarDto: UpdateCarDto){
    const car = this.prisma.car.findFirst({
      where: {
        id: id,
        userId: userId
      }
    });
    if(!car){
      throw new Error("car not found or the user does not own this car")
    }
    return this.prisma.car.update({
      where: { id },
      data: {
        ...updateCarDto,
        updateAt: new Date(),
        userId: userId
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
