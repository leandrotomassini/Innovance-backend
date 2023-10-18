import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { VideoCommentService } from './video-comment.service';
import { CreateVideoCommentDto } from './dto/create-video-comment.dto';
import { UpdateVideoCommentDto } from './dto/update-video-comment.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';

@Controller('video-comment')
export class VideoCommentController {
  constructor(private readonly videoCommentService: VideoCommentService) { }

  @Auth(validRoles.user)
  @Post()
  create(@Body() createVideoCommentDto: CreateVideoCommentDto, @GetUser() user: User) {
    return this.videoCommentService.create(createVideoCommentDto, user);
  }

  @Get()
  findAll() {
    return this.videoCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoCommentService.findOne(id);
  }

  @Get('video/:id')
  findAllByVideoId(@Param('id') idVideo: string) {
    return this.videoCommentService.findAllByVideoId(idVideo);
  }

  @Auth(validRoles.user)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoCommentDto: UpdateVideoCommentDto, @GetUser() user: User) {
    return this.videoCommentService.update(id, updateVideoCommentDto, user);
  }

  @Auth(validRoles.user)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.videoCommentService.remove(id, user);
  }
}
