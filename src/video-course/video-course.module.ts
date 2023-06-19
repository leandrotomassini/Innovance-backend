import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideoCourseService } from './video-course.service';
import { VideoCourseController } from './video-course.controller';
import { VideoCourse } from './entities/video-course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoCourse])
  ],
  controllers: [VideoCourseController],
  providers: [VideoCourseService]
})
export class VideoCourseModule {}
