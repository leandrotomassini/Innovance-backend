import { Module } from '@nestjs/common';
import { LearningRouteCourseLearningRouteService } from './learning-route-course-learning-route.service';
import { LearningRouteCourseLearningRouteController } from './learning-route-course-learning-route.controller';

@Module({
  controllers: [LearningRouteCourseLearningRouteController],
  providers: [LearningRouteCourseLearningRouteService]
})
export class LearningRouteCourseLearningRouteModule {}
