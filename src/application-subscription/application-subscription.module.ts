import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationSubscriptionService } from './application-subscription.service';
import { ApplicationSubscriptionController } from './application-subscription.controller';
import { ApplicationSubscription } from './entities/application-subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationSubscription])
  ],
  controllers: [ApplicationSubscriptionController],
  providers: [ApplicationSubscriptionService]
})
export class ApplicationSubscriptionModule {}
