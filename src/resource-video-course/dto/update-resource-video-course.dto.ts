import { PartialType } from '@nestjs/swagger';
import { CreateResourceVideoCourseDto } from './create-resource-video-course.dto';

export class UpdateResourceVideoCourseDto extends PartialType(CreateResourceVideoCourseDto) {}
