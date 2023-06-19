import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionCourseVideoService } from './section-course-video.service';
import { SectionCourseVideoController } from './section-course-video.controller';
import { SectionCourseVideo } from './entities/section-course-video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectionCourseVideo])],
  controllers: [SectionCourseVideoController],
  providers: [SectionCourseVideoService]
})
export class SectionCourseVideoModule {}
