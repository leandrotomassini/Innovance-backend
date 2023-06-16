import { IsString } from 'class-validator';

import { SubscriptionPlan } from 'src/subscription-plan/entities/subscription-plan.entity';

export class CreateSubscriptorPlanDto {

    @IsString()
    dueDate: string;

    @IsString()
    subscriptionPlan: SubscriptionPlan
}
