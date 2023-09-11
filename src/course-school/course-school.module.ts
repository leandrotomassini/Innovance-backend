import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseSchoolService } from './course-school.service';
import { CourseSchoolController } from './course-school.controller';
import { CourseSchool } from './entities/course-school.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseSchool])
  ],
  controllers: [CourseSchoolController],
  providers: [CourseSchoolService]
})
export class CourseSchoolModule {}
