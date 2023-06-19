import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseTakenService } from './course-taken.service';
import { CourseTakenController } from './course-taken.controller';
import { CourseTaken } from './entities/course-taken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseTaken])],
  controllers: [CourseTakenController],
  providers: [CourseTakenService]
})
export class CourseTakenModule { }
