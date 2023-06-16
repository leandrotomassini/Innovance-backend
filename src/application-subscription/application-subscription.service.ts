import { Injectable } from '@nestjs/common';
import { CreateApplicationSubscriptionDto } from './dto/create-application-subscription.dto';
import { UpdateApplicationSubscriptionDto } from './dto/update-application-subscription.dto';

@Injectable()
export class ApplicationSubscriptionService {
  create(createApplicationSubscriptionDto: CreateApplicationSubscriptionDto) {
    return 'This action adds a new applicationSubscription';
  }

  findAll() {
    return `This action returns all applicationSubscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} applicationSubscription`;
  }

  update(id: number, updateApplicationSubscriptionDto: UpdateApplicationSubscriptionDto) {
    return `This action updates a #${id} applicationSubscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicationSubscription`;
  }
}
