import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubscriptorPlanService } from './subscriptor-plan.service';
import { SubscriptorPlanController } from './subscriptor-plan.controller';
import { SubscriptorPlan } from './entities/subscriptor-plan.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SubscriptionPlanModule } from 'src/subscription-plan/subscription-plan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptorPlan]),
    AuthModule,
    SubscriptionPlanModule
  ],
  controllers: [SubscriptorPlanController],
  providers: [SubscriptorPlanService],
  exports: [SubscriptorPlanService],
})
export class SubscriptorPlanModule {}
