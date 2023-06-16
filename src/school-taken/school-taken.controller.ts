import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchoolTakenService } from './school-taken.service';
import { CreateSchoolTakenDto } from './dto/create-school-taken.dto';
import { UpdateSchoolTakenDto } from './dto/update-school-taken.dto';

@Controller('school-taken')
export class SchoolTakenController {
  constructor(private readonly schoolTakenService: SchoolTakenService) {}

  @Post()
  create(@Body() createSchoolTakenDto: CreateSchoolTakenDto) {
    return this.schoolTakenService.create(createSchoolTakenDto);
  }

  @Get()
  findAll() {
    return this.schoolTakenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolTakenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolTakenDto: UpdateSchoolTakenDto) {
    return this.schoolTakenService.update(+id, updateSchoolTakenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolTakenService.remove(+id);
  }
}
