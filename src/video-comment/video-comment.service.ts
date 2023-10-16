import { Injectable } from '@nestjs/common';
import { CreateVideoCommentDto } from './dto/create-video-comment.dto';
import { UpdateVideoCommentDto } from './dto/update-video-comment.dto';

@Injectable()
export class VideoCommentService {
  create(createVideoCommentDto: CreateVideoCommentDto) {
    return 'This action adds a new videoComment';
  }

  findAll() {
    return `This action returns all videoComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videoComment`;
  }

  update(id: number, updateVideoCommentDto: UpdateVideoCommentDto) {
    return `This action updates a #${id} videoComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoComment`;
  }
}
