import { Module } from '@nestjs/common';
import { VideoCommentService } from './video-comment.service';
import { VideoCommentController } from './video-comment.controller';

@Module({
  controllers: [VideoCommentController],
  providers: [VideoCommentService]
})
export class VideoCommentModule {}
