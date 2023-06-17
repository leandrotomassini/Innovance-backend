import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoCourseService } from './video-course.service';
import { CreateVideoCourseDto } from './dto/create-video-course.dto';
import { UpdateVideoCourseDto } from './dto/update-video-course.dto';

@Controller('video-course')
export class VideoCourseController {
  constructor(private readonly videoCourseService: VideoCourseService) {}

  @Post()
  create(@Body() createVideoCourseDto: CreateVideoCourseDto) {
    return this.videoCourseService.create(createVideoCourseDto);
  }

  @Get()
  findAll() {
    return this.videoCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoCourseDto: UpdateVideoCourseDto) {
    return this.videoCourseService.update(+id, updateVideoCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoCourseService.remove(+id);
  }
}
