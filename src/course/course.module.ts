import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from './entities/course.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    AuthModule
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule { }
