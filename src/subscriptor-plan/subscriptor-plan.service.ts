import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateSubscriptorPlanDto } from './dto/create-subscriptor-plan.dto';
import { UpdateSubscriptorPlanDto } from './dto/update-subscriptor-plan.dto';
import { User } from 'src/auth/entities/user.entity';
import { SubscriptorPlan } from './entities/subscriptor-plan.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class SubscriptorPlanService {

  private readonly logger = new Logger('SubscriptorPlanService');

  constructor(
    @InjectRepository(SubscriptorPlan)
    private readonly subscriptorRepository: Repository<SubscriptorPlan>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createSubscriptorPlanDto: CreateSubscriptorPlanDto, user: User) {
    try {

      const subscriptorPlan = this.subscriptorRepository.create({
        ...createSubscriptorPlanDto,
        user
      });

      await this.subscriptorRepository.save(subscriptorPlan);

      return ({
        subscriptorPlan
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {

    const subscriptotsPlan = await this.subscriptorRepository.find({
      where: { status: true },
    });

    return subscriptotsPlan;
  }

  async findOne(id: string) {
    let subscriptorPlan: SubscriptorPlan;

    if (isUUID(id)) {
      subscriptorPlan = await this.subscriptorRepository.findOneBy({ idSubscriptor: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!subscriptorPlan) {
      throw new NotFoundException(`Subscriptor with id: ${id}, not found.`);
    }

    return subscriptorPlan;
  }

  async update(id: string, updateSubscriptorPlanDto: UpdateSubscriptorPlanDto) {

    const { ...toUpdate } = updateSubscriptorPlanDto;

    const subscriptorPlan = await this.subscriptorRepository.preload({ idSubscriptor: id, ...toUpdate });

    if (!subscriptorPlan)
      throw new NotFoundException(`Subscriptor with id ${id} not found.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(subscriptorPlan);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }

  }

  async remove(id: string) {
    try {
      const subscriptorPlan = await this.subscriptorRepository.findOneBy({ idSubscriptor: id });

      if (!subscriptorPlan) {
        throw new NotFoundException(`Subscription plan with ID '${id}' not found.`);
      }

      // Desactiva el plan de suscripción y actualiza los campos correspondientes
      subscriptorPlan.status = false;

      await this.subscriptorRepository.save(subscriptorPlan);

      return {
        message: `Subscriptor plan with ID '${id}' has been deactivated.`,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
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
