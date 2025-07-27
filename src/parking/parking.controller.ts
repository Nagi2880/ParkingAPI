import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  async create(@Body() createParkingDto: CreateParkingDto) {
    const newParking = await this.parkingService.create(createParkingDto);
    return {
      success: true,
      message: 'Parking created successfully',
      data: newParking,
    };
  }

  @Get()
  async findAll() {
    const allParkings = this.parkingService.findAll();
    return {
      success: true,
      message: 'All parkings retrieved successfully',
      data: allParkings,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const parking = await this.parkingService.findbyId(id);
    return{
      success: true,
      message: `Parking with ID ${id} retrieved successfully`,
      data: parking,
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
    const updatedParking = await this.parkingService.update(id, updateParkingDto);
    return {
    success:true,
    message: `Parking with ID ${id} updated successfully`,
    data: updatedParking,
  }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removeParking = await this.parkingService.remove(id);
    return {
      success: true,
      message: `Parking with ID ${id} deleted successfully`,
      data: removeParking,
    }
  }
}
