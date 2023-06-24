import { IsUUID } from 'class-validator';

import { ApplicationWeb } from 'src/application-web/entities/application-web.entity';
import { SubscriptionPlan } from 'src/subscription-plan/entities/subscription-plan.entity';


export class CreateApplicationSubscriptionDto {

    @IsUUID()
    subscription: SubscriptionPlan;

    @IsUUID()
    applicationWeb: ApplicationWeb;

}
