import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';

@Controller('course')
export class CourseController {
  
  constructor(private readonly courseService: CourseService) {}

  @Auth(validRoles.admin)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @GetUser() user: User) {
    return this.courseService.create(createCourseDto, user);
  }
  
  @Get()
  findAll() {
    return this.courseService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }
  
  @Auth(validRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @GetUser() user: User) {
    return this.courseService.update(id, updateCourseDto, user);
  }
  
  @Auth(validRoles.admin)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.courseService.remove(id, user);
  }
}
