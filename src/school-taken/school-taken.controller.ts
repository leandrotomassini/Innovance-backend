import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { SchoolTakenService } from './school-taken.service';
import { CreateSchoolTakenDto } from './dto/create-school-taken.dto';
import { UpdateSchoolTakenDto } from './dto/update-school-taken.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('school-taken')
export class SchoolTakenController {

  constructor(private readonly schoolTakenService: SchoolTakenService) { }

  @Auth()
  @Post()
  create(@Body() createSchoolTakenDto: CreateSchoolTakenDto, @GetUser() user: User) {
    return this.schoolTakenService.create(createSchoolTakenDto, user);
  }

  @Auth()
  @Get()
  findAll(@GetUser() user: User) {
    return this.schoolTakenService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.schoolTakenService.findOne(id, user);
  }


  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @GetUser() user: User, @Body() updateSchoolTakenDto: UpdateSchoolTakenDto) {
    return this.schoolTakenService.update(id, updateSchoolTakenDto, user);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.schoolTakenService.remove(id, user);
  }
}
