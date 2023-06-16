import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceCourseService } from './resource-course.service';
import { CreateResourceCourseDto } from './dto/create-resource-course.dto';
import { UpdateResourceCourseDto } from './dto/update-resource-course.dto';

@Controller('resource-course')
export class ResourceCourseController {
  constructor(private readonly resourceCourseService: ResourceCourseService) {}

  @Post()
  create(@Body() createResourceCourseDto: CreateResourceCourseDto) {
    return this.resourceCourseService.create(createResourceCourseDto);
  }

  @Get()
  findAll() {
    return this.resourceCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResourceCourseDto: UpdateResourceCourseDto) {
    return this.resourceCourseService.update(+id, updateResourceCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceCourseService.remove(+id);
  }
}
