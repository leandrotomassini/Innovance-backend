import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideoCourseService } from './video-course.service';
import { VideoCourseController } from './video-course.controller';
import { VideoCourse } from './entities/video-course.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoCourse]),
    AuthModule
  ],
  controllers: [VideoCourseController],
  providers: [VideoCourseService]
})
export class VideoCourseModule {}
