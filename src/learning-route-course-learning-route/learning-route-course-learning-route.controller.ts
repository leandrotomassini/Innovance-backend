import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LearningRouteCourseLearningRouteService } from './learning-route-course-learning-route.service';
import { CreateLearningRouteCourseLearningRouteDto } from './dto/create-learning-route-course-learning-route.dto';
import { UpdateLearningRouteCourseLearningRouteDto } from './dto/update-learning-route-course-learning-route.dto';

@Controller('learning-route-course-learning-route')
export class LearningRouteCourseLearningRouteController {
  constructor(private readonly learningRouteCourseLearningRouteService: LearningRouteCourseLearningRouteService) {}

  @Post()
  create(@Body() createLearningRouteCourseLearningRouteDto: CreateLearningRouteCourseLearningRouteDto) {
    return this.learningRouteCourseLearningRouteService.create(createLearningRouteCourseLearningRouteDto);
  }

  @Get()
  findAll() {
    return this.learningRouteCourseLearningRouteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningRouteCourseLearningRouteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLearningRouteCourseLearningRouteDto: UpdateLearningRouteCourseLearningRouteDto) {
    return this.learningRouteCourseLearningRouteService.update(+id, updateLearningRouteCourseLearningRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningRouteCourseLearningRouteService.remove(+id);
  }
}
