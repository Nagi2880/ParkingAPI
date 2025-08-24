import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY

@Injectable()
export class UserService {
  constructor( private readonly prisma: PrismaService) {}
  
  async create(createUserDto: CreateUserDto){
    
    /* Encrypt and hash section */
    
    const hashedPassword = await bcrypt.hash(createUserDto.password, 11);
    const encryptedDNI = await CryptoJS.AES.encrypt(createUserDto.dni, SECRET_KEY).toString();
    const encryptedPhone = await CryptoJS.AES.encrypt(createUserDto.phone, SECRET_KEY).toString();
    /* End encrypt and hash section */

    /* Create the User */

    const newUser = await this.prisma.user.create({
      data:{
        email: createUserDto.email,
        name: createUserDto.name,
        surname: createUserDto.surname,
        nationality: createUserDto.nationality,
        birthDate: createUserDto.birthDate,
        phone: encryptedPhone,
        password: hashedPassword,
        dni: encryptedDNI,
        dniType: createUserDto.dniType,
        createdAt: new Date(),
      } 
    });
/* ////////////////////////////////// */

    return newUser;
  }

  //Part of the code to desencrypt user data when needed 
  private desencryptUser(user: any){
    return {
      ...user,
      dni: CryptoJS.AES.decrypt(user.dni, SECRET_KEY).toString(CryptoJS.enc.Utf8),
      phone: CryptoJS.AES.decrypt(user.phone, SECRET_KEY).toString(CryptoJS.enc.Utf8),
      password: undefined,
    };
  }
  /* /////////////////////////////////////////////////// */

  async findAll() {
    const allusers = await this.prisma.user.findMany()
    
    return allusers.map(user => (this.desencryptUser(user)))
    }

  async findbyId(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    return this.desencryptUser(user);
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    return this.desencryptUser(user);
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
