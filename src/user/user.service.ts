import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
@Injectable()
export class UserService {
  constructor( private readonly prisma: PrismaService) {}
  
  create(createUserDto: CreateUserDto){
    const newUser = this.prisma.user.create({
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
        updatedAt: new Date(),
      } 
    });
    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
