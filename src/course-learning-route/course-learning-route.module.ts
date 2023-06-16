import { Module } from '@nestjs/common';
import { CourseLearningRouteService } from './course-learning-route.service';
import { CourseLearningRouteController } from './course-learning-route.controller';

@Module({
  controllers: [CourseLearningRouteController],
  providers: [CourseLearningRouteService]
})
export class CourseLearningRouteModule {}
