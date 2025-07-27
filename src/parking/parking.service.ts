import { Injectable } from '@nestjs/common';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import {PrismaService} from '../prisma.service'
@Injectable()
export class ParkingService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createParkingDto: CreateParkingDto) {
    const newParking = await this.prisma.parking.create({
      data:{
        id: createParkingDto.id,
        ownerId: createParkingDto.ownerId,
        name: createParkingDto.name,
        description: createParkingDto.description,
        address: createParkingDto.address,
        latitude: createParkingDto.latitude,
        longitude: createParkingDto.longitude,
        pricePerHour: createParkingDto.pricePerHour,
        placesToPark: createParkingDto.placesToPark,
        createdAt: createParkingDto.createdAt,
      }
    })
    return newParking
  }

  async findAll() {
    const parkings = await this.prisma.parking.findMany();
    return parkings
  }

  async findbyId(id: string) {
    const parking = await this.prisma.parking.findUnique({
      where: { id },
      include:{
        owner: true,
      }
      //route dedicated to admin user to find parking by id
      //if you want to find parking by id for a user, you can use the findbyId method in the user service
      //and pass the id of the parking as a parameter
    })
    return parking
  }

  async update(id: string, updateParkingDto: UpdateParkingDto) {
  const updatedParking = await this.prisma.parking.update({
    where: { id },
    data:{
      ...updateParkingDto,
      updatedAt: new Date(),
    }
      ///Route for edit parking data like name, description, priceperHour and placesToPark
  })
  return updatedParking  
  }

  async remove(id: string) {
  const removeParking = this.prisma.parking.delete({
    where:{ id },
    
  })
  return removeParking
  }
}
