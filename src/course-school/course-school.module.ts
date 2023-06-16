import { Module } from '@nestjs/common';
import { CourseSchoolService } from './course-school.service';
import { CourseSchoolController } from './course-school.controller';

@Module({
  controllers: [CourseSchoolController],
  providers: [CourseSchoolService]
})
export class CourseSchoolModule {}
