import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseLearningRouteService } from './course-learning-route.service';
import { CreateCourseLearningRouteDto } from './dto/create-course-learning-route.dto';
import { UpdateCourseLearningRouteDto } from './dto/update-course-learning-route.dto';

@Controller('course-learning-route')
export class CourseLearningRouteController {
  constructor(private readonly courseLearningRouteService: CourseLearningRouteService) {}

  @Post()
  create(@Body() createCourseLearningRouteDto: CreateCourseLearningRouteDto) {
    return this.courseLearningRouteService.create(createCourseLearningRouteDto);
  }

  @Get()
  findAll() {
    return this.courseLearningRouteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseLearningRouteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseLearningRouteDto: UpdateCourseLearningRouteDto) {
    return this.courseLearningRouteService.update(+id, updateCourseLearningRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseLearningRouteService.remove(+id);
  }
}
