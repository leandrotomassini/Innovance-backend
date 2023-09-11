import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CourseSchoolService } from './course-school.service';
import { CreateCourseSchoolDto } from './dto/create-course-school.dto';
import { UpdateCourseSchoolDto } from './dto/update-course-school.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';

@Controller('course-school')
export class CourseSchoolController {
  
  constructor(private readonly courseSchoolService: CourseSchoolService) { }

  @Auth(validRoles.admin)
  @Post()
  create(@Body() createCourseSchoolDto: CreateCourseSchoolDto) {
    return this.courseSchoolService.create(createCourseSchoolDto);
  }

  @Get()
  findAll() {
    return this.courseSchoolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseSchoolService.findOne(id);
  }

  @Auth(validRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseSchoolDto: UpdateCourseSchoolDto) {
    return this.courseSchoolService.update(id, updateCourseSchoolDto);
  }

  @Auth(validRoles.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseSchoolService.remove(id);
  }
}
