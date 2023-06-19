import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResourceVideoCourseService } from './resource-video-course.service';
import { ResourceVideoCourseController } from './resource-video-course.controller';
import { ResourceVideoCourse } from './entities/resource-video-course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceVideoCourse])],
  controllers: [ResourceVideoCourseController],
  providers: [ResourceVideoCourseService]
})
export class ResourceVideoCourseModule {}
