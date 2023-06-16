import { PartialType } from '@nestjs/swagger';
import { CreateResourceCourseDto } from './create-resource-course.dto';

export class UpdateResourceCourseDto extends PartialType(CreateResourceCourseDto) {}
