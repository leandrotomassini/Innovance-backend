import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LearningRouteService } from './learning-route.service';
import { LearningRouteController } from './learning-route.controller';
import { LearningRoute } from './entities/learning-route.entity';



@Module({
  imports: [TypeOrmModule.forFeature([LearningRoute])],
  controllers: [LearningRouteController],
  providers: [LearningRouteService]
})
export class LearningRouteModule {}
