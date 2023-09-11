import { PartialType } from '@nestjs/swagger';
import { CreateSectionCourseVideoDto } from './create-section-course-video.dto';

export class UpdateSectionCourseVideoDto extends PartialType(CreateSectionCourseVideoDto) {}
