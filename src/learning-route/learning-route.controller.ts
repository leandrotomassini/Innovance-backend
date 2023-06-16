import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LearningRouteService } from './learning-route.service';
import { CreateLearningRouteDto } from './dto/create-learning-route.dto';
import { UpdateLearningRouteDto } from './dto/update-learning-route.dto';

@Controller('learning-route')
export class LearningRouteController {
  constructor(private readonly learningRouteService: LearningRouteService) {}

  @Post()
  create(@Body() createLearningRouteDto: CreateLearningRouteDto) {
    return this.learningRouteService.create(createLearningRouteDto);
  }

  @Get()
  findAll() {
    return this.learningRouteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningRouteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLearningRouteDto: UpdateLearningRouteDto) {
    return this.learningRouteService.update(+id, updateLearningRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningRouteService.remove(+id);
  }
}
