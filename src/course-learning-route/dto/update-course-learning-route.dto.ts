import { PartialType } from '@nestjs/swagger';
import { CreateCourseLearningRouteDto } from './create-course-learning-route.dto';

export class UpdateCourseLearningRouteDto extends PartialType(CreateCourseLearningRouteDto) {}
