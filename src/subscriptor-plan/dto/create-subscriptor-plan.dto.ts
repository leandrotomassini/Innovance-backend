import { IsString, IsUUID } from 'class-validator';


export class CreateSubscriptorPlanDto {

    @IsString()
    @IsUUID()
    subscriptionPlan: string;

    @IsString()
    due_date: string;
}
