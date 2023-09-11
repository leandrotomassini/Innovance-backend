import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { VideoTakenService } from './video-taken.service';
import { CreateVideoTakenDto } from './dto/create-video-taken.dto';
import { UpdateVideoTakenDto } from './dto/update-video-taken.dto';
import { Auth } from 'src/auth/decorators';

@Controller('video-taken')
export class VideoTakenController {

  constructor(private readonly videoTakenService: VideoTakenService) {}

  @Auth()
  @Post()
  create(@Body() createVideoTakenDto: CreateVideoTakenDto) {
    return this.videoTakenService.create(createVideoTakenDto);
  }
  
  @Auth()
  @Get()
  findAll() {
    return this.videoTakenService.findAll();
  }
  
  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoTakenService.findOne(id);
  }
  
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoTakenDto: UpdateVideoTakenDto) {
    return this.videoTakenService.update(id, updateVideoTakenDto);
  }
  
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoTakenService.remove(id);
  }
}
