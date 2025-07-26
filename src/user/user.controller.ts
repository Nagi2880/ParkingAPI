import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Get('/getuser:id')
  async findbyId(@Param('id') id: string) {
    const user = await this.userService.findbyId(id);
    return {
      success: true,
      message: `User with ID ${id} retrieved successfully`,
      data: user,
    } 
  }

  @Patch('/updateuser:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return {
      success: true,
      message: `User with ID ${id} updated successfully`,
      data: updatedUser,
    };
  }

  @Delete('/deleteuser:id')
  remove(@Param('id') id: string) {
    const removeUser = this.userService.remove(id);
    return {
      success: true,
      message: `User with ID ${id} deleted successfully`,
      data: removeUser,
    }
  }
}
