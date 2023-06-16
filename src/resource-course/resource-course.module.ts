import { Module } from '@nestjs/common';
import { ResourceCourseService } from './resource-course.service';
import { ResourceCourseController } from './resource-course.controller';

@Module({
  controllers: [ResourceCourseController],
  providers: [ResourceCourseService]
})
export class ResourceCourseModule {}
