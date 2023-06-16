import { Module } from '@nestjs/common';
import { CourseTakenService } from './course-taken.service';
import { CourseTakenController } from './course-taken.controller';

@Module({
  controllers: [CourseTakenController],
  providers: [CourseTakenService]
})
export class CourseTakenModule {}
