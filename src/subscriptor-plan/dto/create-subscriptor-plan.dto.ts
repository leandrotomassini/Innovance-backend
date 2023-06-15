import { Type } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

import { SubscriptionPlan } from 'src/subscription-plan/entities/subscription-plan.entity';


export class CreateSubscriptorPlanDto {

    @Type(() => SubscriptionPlan)
    subscriptionPlan: SubscriptionPlan;

    @IsString()
    due_date: string;
}
