import { Module } from '@nestjs/common';
import { SectionCourseService } from './section-course.service';
import { SectionCourseController } from './section-course.controller';

@Module({
  controllers: [SectionCourseController],
  providers: [SectionCourseService]
})
export class SectionCourseModule {}
