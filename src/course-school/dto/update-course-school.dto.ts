import { PartialType } from '@nestjs/swagger';
import { CreateCourseSchoolDto } from './create-course-school.dto';

export class UpdateCourseSchoolDto extends PartialType(CreateCourseSchoolDto) {}
