import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CourseTakenService } from './course-taken.service';
import { CreateCourseTakenDto } from './dto/create-course-taken.dto';
import { UpdateCourseTakenDto } from './dto/update-course-taken.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('course-taken')
export class CourseTakenController {

  constructor(private readonly courseTakenService: CourseTakenService) {}

  @Auth()
  @Post()
  create(@Body() createCourseTakenDto: CreateCourseTakenDto, @GetUser() user: User) {
    return this.courseTakenService.create(createCourseTakenDto, user);
  }
  
  @Auth()
  @Get()
  findAll() {
    return this.courseTakenService.findAll();
  }
  
  @Auth()
  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseTakenService.findOne(id);
  }
  
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseTakenDto: UpdateCourseTakenDto) {
    return this.courseTakenService.update(id, updateCourseTakenDto);
  }
  
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseTakenService.remove(id);
  }
}
