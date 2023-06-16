import { Module } from '@nestjs/common';
import { LearningRouteService } from './learning-route.service';
import { LearningRouteController } from './learning-route.controller';

@Module({
  controllers: [LearningRouteController],
  providers: [LearningRouteService]
})
export class LearningRouteModule {}
