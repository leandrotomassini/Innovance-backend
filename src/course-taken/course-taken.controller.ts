import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseTakenService } from './course-taken.service';
import { CreateCourseTakenDto } from './dto/create-course-taken.dto';
import { UpdateCourseTakenDto } from './dto/update-course-taken.dto';

@Controller('course-taken')
export class CourseTakenController {
  constructor(private readonly courseTakenService: CourseTakenService) {}

  @Post()
  create(@Body() createCourseTakenDto: CreateCourseTakenDto) {
    return this.courseTakenService.create(createCourseTakenDto);
  }

  @Get()
  findAll() {
    return this.courseTakenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseTakenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseTakenDto: UpdateCourseTakenDto) {
    return this.courseTakenService.update(+id, updateCourseTakenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseTakenService.remove(+id);
  }
}
