import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateVideoCommentDto } from './dto/create-video-comment.dto';
import { UpdateVideoCommentDto } from './dto/update-video-comment.dto';
import { VideoComment } from './entities/video-comment.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class VideoCommentService {

  private readonly logger = new Logger('VideoCommentService');

  constructor(
    @InjectRepository(VideoComment)
    private readonly videoCommentRepository: Repository<VideoComment>,
    private readonly dataSource: DataSource,
  ) { }

  create(createVideoCommentDto: CreateVideoCommentDto) {
    return 'ok';
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
