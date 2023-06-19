import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionCourseService } from './section-course.service';
import { SectionCourseController } from './section-course.controller';
import { SectionCourse } from './entities/section-course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectionCourse])],
  controllers: [SectionCourseController],
  providers: [SectionCourseService]
})
export class SectionCourseModule {}
