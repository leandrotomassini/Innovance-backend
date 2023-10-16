import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { VideoCommentService } from './video-comment.service';
import { CreateVideoCommentDto } from './dto/create-video-comment.dto';
import { UpdateVideoCommentDto } from './dto/update-video-comment.dto';

@Controller('video-comment')
export class VideoCommentController {
  constructor(private readonly videoCommentService: VideoCommentService) {}

  @Post()
  create(@Body() createVideoCommentDto: CreateVideoCommentDto) {
    return this.videoCommentService.create(createVideoCommentDto);
  }

  @Get()
  findAll() {
    return this.videoCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoCommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoCommentDto: UpdateVideoCommentDto) {
    return this.videoCommentService.update(+id, updateVideoCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoCommentService.remove(+id);
  }
}
