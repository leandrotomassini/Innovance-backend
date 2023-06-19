import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LearningRouteCourseLearningRouteService } from './learning-route-course-learning-route.service';
import { LearningRouteCourseLearningRouteController } from './learning-route-course-learning-route.controller';
import { LearningRouteCourseLearningRoute } from './entities/learning-route-course-learning-route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LearningRouteCourseLearningRoute])],
  controllers: [LearningRouteCourseLearningRouteController],
  providers: [LearningRouteCourseLearningRouteService]
})
export class LearningRouteCourseLearningRouteModule {}
