import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseInstructorService } from './course-instructor.service';
import { CreateCourseInstructorDto } from './dto/create-course-instructor.dto';
import { UpdateCourseInstructorDto } from './dto/update-course-instructor.dto';

@Controller('course-instructor')
export class CourseInstructorController {
  constructor(private readonly courseInstructorService: CourseInstructorService) {}

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
    return this.courseInstructorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseInstructorDto: UpdateCourseInstructorDto) {
    return this.courseInstructorService.update(+id, updateCourseInstructorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseInstructorService.remove(+id);
  }
}
