import { Module } from '@nestjs/common';
import { ApplicationSubscriptionService } from './application-subscription.service';
import { ApplicationSubscriptionController } from './application-subscription.controller';

@Module({
  controllers: [ApplicationSubscriptionController],
  providers: [ApplicationSubscriptionService]
})
export class ApplicationSubscriptionModule {}
