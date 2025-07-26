import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
@Injectable()
export class UserService {
  constructor( private readonly prisma: PrismaService) {}
  
  async create(createUserDto: CreateUserDto){
    const newUser = await this.prisma.user.create({
      data:{
        id: createUserDto.id,
        email: createUserDto.email,
        name: createUserDto.name,
        surname: createUserDto.surname,
        nationality: createUserDto.nationality,
        birthDate: createUserDto.birthDate,
        phone: createUserDto.phone,
        password: createUserDto.password,
        createdAt: new Date(),
      } 
    });
    return newUser;
  }

  async findAll() {
    const allusers = await this.prisma.user.findMany()
    return allusers
  }

  async findbyId(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    return user;
  }

  async update(id: string , updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data:{
        ...updateUserDto,
        updatedAt: new Date(),
      }
    });
    return updatedUser;
  }

  async remove(id: string) {
    const deleteuser = await this.prisma.user.delete({
      where: { id },   
    });
    return deleteuser;
  }
}
