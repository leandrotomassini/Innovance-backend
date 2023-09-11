import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';


@Controller('instructor')
export class InstructorController {
  
  constructor(private readonly instructorService: InstructorService) {}

  @Auth(validRoles.admin)
  @Post()
  create(
    @Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorService.create(createInstructorDto);
  }
  
  @Get()
  findAll() {
    return this.instructorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorService.findOne(id);
  }

  @Auth(validRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstructorDto: UpdateInstructorDto) {
    return this.instructorService.update(id, updateInstructorDto);
  }
  
  @Auth(validRoles.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instructorService.remove(id);
  }
}
