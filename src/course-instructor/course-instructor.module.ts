import { Module } from '@nestjs/common';
import { CourseInstructorService } from './course-instructor.service';
import { CourseInstructorController } from './course-instructor.controller';

@Module({
  controllers: [CourseInstructorController],
  providers: [CourseInstructorService]
})
export class CourseInstructorModule {}
