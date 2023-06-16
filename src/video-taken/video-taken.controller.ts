import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoTakenService } from './video-taken.service';
import { CreateVideoTakenDto } from './dto/create-video-taken.dto';
import { UpdateVideoTakenDto } from './dto/update-video-taken.dto';

@Controller('video-taken')
export class VideoTakenController {
  constructor(private readonly videoTakenService: VideoTakenService) {}

  @Post()
  create(@Body() createVideoTakenDto: CreateVideoTakenDto) {
    return this.videoTakenService.create(createVideoTakenDto);
  }

  @Get()
  findAll() {
    return this.videoTakenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoTakenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoTakenDto: UpdateVideoTakenDto) {
    return this.videoTakenService.update(+id, updateVideoTakenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoTakenService.remove(+id);
  }
}
