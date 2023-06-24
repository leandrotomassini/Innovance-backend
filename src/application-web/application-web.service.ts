import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { isUUID } from 'class-validator';

import { CreateApplicationWebDto } from './dto/create-application-web.dto';
import { UpdateApplicationWebDto } from './dto/update-application-web.dto';
import { ApplicationWeb } from './entities/application-web.entity';

@Injectable()
export class ApplicationWebService {

  private readonly logger = new Logger('ApplicationWebService');

  constructor(
    @InjectRepository(ApplicationWeb)
    private readonly applicationWebRepository: Repository<ApplicationWeb>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createApplicationWebDto: CreateApplicationWebDto) {
    try {
      const applicationWeb = this.applicationWebRepository.create(createApplicationWebDto);

      await this.applicationWebRepository.save(applicationWeb);

      return createApplicationWebDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const applicationWeb = await this.applicationWebRepository
      .find({
        where: { status: true },
      });

    return applicationWeb;
  }

  async findOne(id: string) {

    let applicationWeb: ApplicationWeb;

    if (isUUID(id)) {
      applicationWeb = await this.applicationWebRepository.findOneBy({ idApplicationWeb: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!applicationWeb) {
      throw new NotFoundException(`Application web with id: ${id}, not found.`);
    }

    return applicationWeb;
  }

  async update(id: string, updateApplicationWebDto: UpdateApplicationWebDto) {
    try {
      const applicationWeb = await this.applicationWebRepository.findOneBy({ idApplicationWeb: id });

      if (!applicationWeb) {
        throw new NotFoundException(`Application web with ID '${id}' not found.`);
      }

      Object.assign(applicationWeb, updateApplicationWebDto);

      await this.applicationWebRepository.save(applicationWeb);

      return applicationWeb;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const applicationWeb = await this.applicationWebRepository.findOneBy({ idApplicationWeb: id });

      if (!applicationWeb) {
        throw new NotFoundException(`Application web plan with ID '${id}' not found.`);
      }

      applicationWeb.status = false;

      await this.applicationWebRepository.save(applicationWeb);

      return {
        message: `Application web plan with ID '${id}' has been deactivated.`,
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