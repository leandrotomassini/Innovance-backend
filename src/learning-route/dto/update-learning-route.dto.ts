import { PartialType } from '@nestjs/swagger';
import { CreateLearningRouteDto } from './create-learning-route.dto';

export class UpdateLearningRouteDto extends PartialType(CreateLearningRouteDto) {}
