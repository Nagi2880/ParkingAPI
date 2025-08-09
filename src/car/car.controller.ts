import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('api/car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('newcar')
  async create(@Body() createCarDto: CreateCarDto) {
    const newCar = await this.carService.create(createCarDto);
    return {
      success: true,
      message: 'Car created successfully',
      data: newCar
    }
    }
  

  @Get('/getallcars/:userId')
  async findAll(@Param('userId') userId: string) {
    const allCars = await this.carService.findAll(userId);
    return{
      success: true,
      message: 'All cars retrieved successfully',
      data: allCars
    }
  }
  @Get('/GetcarbyId/:id')
  async findbyId(@Param('id') id: string){
    const car = await this.carService.findbyId(id);
    if (!car) {
      return{
        success:false,
        message: 'Car not found',
      }
    }else{
      return {
        success: true,
        message: 'Car retrieved successfully',
        data: car
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
  const updateCar = await this.carService.updatemyCar(id, updateCarDto.userId, updateCarDto);  
  return{
    success: true,
    message: `Car with ID ${id} updated successfully`,
    data: updateCar
  }
}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removeCar = await this.carService.remove(id);
    return{
      success: true,
      message: `Car with ID ${id} deleted successfully`,
      data: removeCar
    }
  }
}
