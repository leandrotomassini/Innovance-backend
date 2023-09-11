import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionCourseVideoService } from './section-course-video.service';
import { SectionCourseVideoController } from './section-course-video.controller';
import { SectionCourseVideo } from './entities/section-course-video.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SectionCourseVideo]),
    AuthModule
  ],
  controllers: [SectionCourseVideoController],
  providers: [SectionCourseVideoService]
})
export class SectionCourseVideoModule {}
