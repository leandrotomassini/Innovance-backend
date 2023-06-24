import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { SectionCourseService } from './section-course.service';
import { CreateSectionCourseDto } from './dto/create-section-course.dto';
import { UpdateSectionCourseDto } from './dto/update-section-course.dto';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@Controller('section-course')
export class SectionCourseController {

  constructor(private readonly sectionCourseService: SectionCourseService) { }

  @Auth(validRoles.instructor)
  @Post()
  create(@Body() createSectionCourseDto: CreateSectionCourseDto) {
    return this.sectionCourseService.create(createSectionCourseDto);
  }

  @Get()
  findAll() {
    return this.sectionCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionCourseService.findOne(id);
  }

  @Auth(validRoles.instructor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectionCourseDto: UpdateSectionCourseDto) {
    return this.sectionCourseService.update(id, updateSectionCourseDto);
  }

  @Auth(validRoles.instructor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionCourseService.remove(id);
  }
}
