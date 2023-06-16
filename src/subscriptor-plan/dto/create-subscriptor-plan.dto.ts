import { IsString } from 'class-validator';

export class CreateSubscriptorPlanDto {

    @IsString()
    dueDate: string;

}
