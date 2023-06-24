import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateApplicationSubscriptionDto } from './dto/create-application-subscription.dto';
import { UpdateApplicationSubscriptionDto } from './dto/update-application-subscription.dto';
import { ApplicationSubscription } from './entities/application-subscription.entity';
import { isUUID } from 'class-validator';


@Injectable()
export class ApplicationSubscriptionService {

  private readonly logger = new Logger('ApplicationSubscriptionService');

  constructor(
    @InjectRepository(ApplicationSubscription)
    private readonly applicationSubscriptionRepository: Repository<ApplicationSubscription>,
    private readonly dataSource: DataSource,
  ) { }



  async create(createApplicationSubscriptionDto: CreateApplicationSubscriptionDto) {
    try {

      const applicationSubscription = this.applicationSubscriptionRepository
        .create({
          ...createApplicationSubscriptionDto
        });

      await this.applicationSubscriptionRepository.save(applicationSubscription);

      return ({
        applicationSubscription
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {

    const applicationsSubscription = await this.applicationSubscriptionRepository
      .find({
        where: { status: true },
      });

    return applicationsSubscription;
  }

  async findOne(id: string) {

    let applicationSubscription: ApplicationSubscription;

    if (isUUID(id)) {
      applicationSubscription = await this.applicationSubscriptionRepository
        .findOneBy({ idApplicationSubscription: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!applicationSubscription) {
      throw new NotFoundException(`Application subscription with id: ${id}, not found.`);
    }

    return applicationSubscription;
  }

  async update(id: string, updateApplicationSubscriptionDto: UpdateApplicationSubscriptionDto) {
    const { ...toUpdate } = updateApplicationSubscriptionDto;

    const applicationSubscription = await this.applicationSubscriptionRepository
      .preload({ idApplicationSubscription: id, ...toUpdate });

    if (!applicationSubscription)
      throw new NotFoundException(`Application subscription with id ${id} not found.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(applicationSubscription);
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

      const applicationSubscription = await this.applicationSubscriptionRepository
        .findOneBy({ idApplicationSubscription: id });

      if (!applicationSubscription) {
        throw new NotFoundException(`Application subscription with ID '${id}' not found.`);
      }

      applicationSubscription.status = false;

      await this.applicationSubscriptionRepository
        .save(applicationSubscription);

      return {
        message: `Application subscription with ID '${id}' has been deactivated.`,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any): never {

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs.');
  }
}


// TODO: Revisar con postman