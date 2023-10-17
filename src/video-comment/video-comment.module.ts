import { Module } from '@nestjs/common';
import { VideoCommentService } from './video-comment.service';
import { VideoCommentController } from './video-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideoComment } from './entities/video-comment.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoComment]),
    AuthModule
  ],
  controllers: [VideoCommentController],
  providers: [VideoCommentService]
})
export class VideoCommentModule {}
