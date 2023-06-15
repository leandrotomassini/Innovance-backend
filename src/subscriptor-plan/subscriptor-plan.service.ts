import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateSubscriptorPlanDto } from './dto/create-subscriptor-plan.dto';
import { UpdateSubscriptorPlanDto } from './dto/update-subscriptor-plan.dto';
import { SubscriptorPlan } from './entities/subscriptor-plan.entity';
import { User } from 'src/auth/entities/user.entity';
import { SubscriptionPlan } from 'src/subscription-plan/entities/subscription-plan.entity';


@Injectable()
export class SubscriptorPlanService {

  private readonly logger = new Logger('SubscriptionPlanService');

  constructor(
    @InjectRepository(SubscriptorPlan)
    private readonly subscriptionPlanRepository: Repository<SubscriptorPlan>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createSubscriptorPlanDto: CreateSubscriptorPlanDto, user: User) {
    try {
      const subscriptorPlan = this.subscriptionPlanRepository.create({
        ...createSubscriptorPlanDto,
        user: user,
      });

      await this.subscriptionPlanRepository.save(subscriptorPlan);

      return createSubscriptorPlanDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  findAll() {
    return `This action returns all subscriptorPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptorPlan`;
  }

  update(id: number, updateSubscriptorPlanDto: UpdateSubscriptorPlanDto) {
    return `This action updates a #${id} subscriptorPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriptorPlan`;
  }

  /**
   * Maneja las excepciones relacionadas con la base de datos.
   * @param error - Error de base de datos.
   * @throws BadRequestException si ocurre un error de duplicidad.
   * @throws InternalServerErrorException si ocurre un error inesperado en la base de datos.
   */
  private handleDBExceptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs.');
  }
}
