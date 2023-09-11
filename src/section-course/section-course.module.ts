import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionCourseService } from './section-course.service';
import { SectionCourseController } from './section-course.controller';
import { SectionCourse } from './entities/section-course.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SectionCourse]),
    AuthModule
  ],
  controllers: [SectionCourseController],
  providers: [SectionCourseService]
})
export class SectionCourseModule { }
