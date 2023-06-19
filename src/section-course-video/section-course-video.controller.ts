import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectionCourseVideoService } from './section-course-video.service';
import { CreateSectionCourseVideoDto } from './dto/create-section-course-video.dto';
import { UpdateSectionCourseVideoDto } from './dto/update-section-course-video.dto';

@Controller('section-course-video')
export class SectionCourseVideoController {
  constructor(private readonly sectionCourseVideoService: SectionCourseVideoService) {}

  @Post()
  create(@Body() createSectionCourseVideoDto: CreateSectionCourseVideoDto) {
    return this.sectionCourseVideoService.create(createSectionCourseVideoDto);
  }

  @Get()
  findAll() {
    return this.sectionCourseVideoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionCourseVideoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectionCourseVideoDto: UpdateSectionCourseVideoDto) {
    return this.sectionCourseVideoService.update(+id, updateSectionCourseVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionCourseVideoService.remove(+id);
  }
}
