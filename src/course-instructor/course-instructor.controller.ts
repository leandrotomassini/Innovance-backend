import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CourseInstructorService } from './course-instructor.service';
import { CreateCourseInstructorDto } from './dto/create-course-instructor.dto';
import { UpdateCourseInstructorDto } from './dto/update-course-instructor.dto';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@Controller('course-instructor')
export class CourseInstructorController {

  constructor(private readonly courseInstructorService: CourseInstructorService) { }

  @Auth(validRoles.admin)
  @Post()
  create(@Body() createCourseInstructorDto: CreateCourseInstructorDto) {
    return this.courseInstructorService.create(createCourseInstructorDto);
  }

  @Get()
  findAll() {
    return this.courseInstructorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseInstructorService.findOne(id);
  }

  @Auth(validRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseInstructorDto: UpdateCourseInstructorDto) {
    return this.courseInstructorService.update(id, updateCourseInstructorDto);
  }

  @Auth(validRoles.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseInstructorService.remove(id);
  }
}
