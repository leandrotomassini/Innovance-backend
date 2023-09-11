import { PartialType } from '@nestjs/swagger';
import { CreateApplicationSubscriptionDto } from './create-application-subscription.dto';

export class UpdateApplicationSubscriptionDto extends PartialType(CreateApplicationSubscriptionDto) {}
