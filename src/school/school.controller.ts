import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';

@Controller('school')
export class SchoolController {

  constructor(private readonly schoolService: SchoolService) { }

  @Auth(validRoles.admin)
  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto, @GetUser() user: User) {
    return this.schoolService.create(createSchoolDto, user);
  }

  @Get()
  findAll() {
    return this.schoolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.schoolService.findOne(id);
  }

  @Auth(validRoles.admin)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSchoolDto: UpdateSchoolDto, @GetUser() user: User) {
    return this.schoolService.update(id, updateSchoolDto, user);
  }

  @Auth(validRoles.admin)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.schoolService.remove(id, user);
  }
}
