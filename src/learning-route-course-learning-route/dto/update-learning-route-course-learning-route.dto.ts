import { PartialType } from '@nestjs/swagger';
import { CreateLearningRouteCourseLearningRouteDto } from './create-learning-route-course-learning-route.dto';

export class UpdateLearningRouteCourseLearningRouteDto extends PartialType(CreateLearningRouteCourseLearningRouteDto) {}
