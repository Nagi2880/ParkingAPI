import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserGuard } from '../guards/delete-user.guard';
import { JwtAuthGuard } from 'src/guards/jwd-auth.guard';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {

    const newUser = await this.userService.create(createUserDto);
    return {
      success: true,
      message: `User ${newUser.name && newUser.surname} created successfully`,
      data: newUser,
    };
  }

  @Get('/allusers')
  async findAll() {

    const allUsers = await this.userService.findAll();
    return {
      success: true,
      mesage: 'All users retrieved successfully',
      data: allUsers,
    }
  }

  @Get('/getuserbyID:id')
  async findbyId(@Param('id') id: string) {
    const user = await this.userService.findbyId(id);
    return {
      success: true,
      message: `User with ID ${id} retrieved successfully`,
      data: user,
    } 
  }

  @Get('/getuserbyEmail/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return {
      success: true,
      message: `User with email ${email} retrieved successfully`,
      data: user,
    };
  }

  @Patch('/updateuser/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return {
      success: true,
      message: `User with ID ${id} updated successfully`,
      data: updatedUser,
    };
  }

  @Delete('/deleteuser/:id')
  @UseGuards(JwtAuthGuard,DeleteUserGuard)
  async  remove(@Param('id') id: string) {
    const removeUser = await this.userService.remove(id);
    return {
      success: true,
      message: `User with ID ${id} deleted successfully`,
      data: removeUser,
    }
  }
}
