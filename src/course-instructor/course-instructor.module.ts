import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseInstructorService } from './course-instructor.service';
import { CourseInstructorController } from './course-instructor.controller';
import { CourseInstructor } from './entities/course-instructor.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseInstructor]),
    AuthModule
  ],
  controllers: [CourseInstructorController],
  providers: [CourseInstructorService]
})
export class CourseInstructorModule {}
