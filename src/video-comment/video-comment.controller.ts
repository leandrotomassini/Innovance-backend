import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { VideoCommentService } from './video-comment.service';
import { CreateVideoCommentDto } from './dto/create-video-comment.dto';
import { UpdateVideoCommentDto } from './dto/update-video-comment.dto';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@Controller('video-comment')
export class VideoCommentController {
  constructor(private readonly videoCommentService: VideoCommentService) {}

  @Auth(validRoles.user)
  @Post()
  create(@Body() createVideoCommentDto: CreateVideoCommentDto) {
    return this.videoCommentService.create(createVideoCommentDto);
  }
  
  @Auth(validRoles.user)
  @Get()
  findAll() {
    return this.videoCommentService.findAll();
  }
  
  @Auth(validRoles.user)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoCommentService.findOne(+id);
  }
  
  @Auth(validRoles.user)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoCommentDto: UpdateVideoCommentDto) {
    return this.videoCommentService.update(+id, updateVideoCommentDto);
  }
  
  @Auth(validRoles.user)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoCommentService.remove(+id);
  }
}
