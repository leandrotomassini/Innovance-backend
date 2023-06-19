import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseInstructorService } from './course-instructor.service';
import { CourseInstructorController } from './course-instructor.controller';
import { CourseInstructor } from './entities/course-instructor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseInstructor])],
  controllers: [CourseInstructorController],
  providers: [CourseInstructorService]
})
export class CourseInstructorModule {}
