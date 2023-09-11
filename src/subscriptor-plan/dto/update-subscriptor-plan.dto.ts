import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptorPlanDto } from './create-subscriptor-plan.dto';

export class UpdateSubscriptorPlanDto extends PartialType(CreateSubscriptorPlanDto) {}
