import { PartialType } from '@nestjs/swagger';
import { CreateCourseTakenDto } from './create-course-taken.dto';

export class UpdateCourseTakenDto extends PartialType(CreateCourseTakenDto) {}
