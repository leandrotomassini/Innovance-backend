import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceVideoCourseService } from './resource-video-course.service';
import { CreateResourceVideoCourseDto } from './dto/create-resource-video-course.dto';
import { UpdateResourceVideoCourseDto } from './dto/update-resource-video-course.dto';

@Controller('resource-video-course')
export class ResourceVideoCourseController {
  constructor(private readonly resourceVideoCourseService: ResourceVideoCourseService) {}

  @Post()
  create(@Body() createResourceVideoCourseDto: CreateResourceVideoCourseDto) {
    return this.resourceVideoCourseService.create(createResourceVideoCourseDto);
  }

  @Get()
  findAll() {
    return this.resourceVideoCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceVideoCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResourceVideoCourseDto: UpdateResourceVideoCourseDto) {
    return this.resourceVideoCourseService.update(+id, updateResourceVideoCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceVideoCourseService.remove(+id);
  }
}
