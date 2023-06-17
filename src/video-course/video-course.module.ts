import { Module } from '@nestjs/common';
import { VideoCourseService } from './video-course.service';
import { VideoCourseController } from './video-course.controller';

@Module({
  controllers: [VideoCourseController],
  providers: [VideoCourseService]
})
export class VideoCourseModule {}
