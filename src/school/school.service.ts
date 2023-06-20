import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { User } from 'src/auth/entities/user.entity';
import { School } from './entities/school.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class SchoolService {

  private readonly logger = new Logger('SchoolService');

  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createSchoolDto: CreateSchoolDto, user: User) {
    try {

      const school = this.schoolRepository
        .create({
          ...createSchoolDto,
          user: user,
        });

      await this.schoolRepository.save(school);

      return school;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const schools = await this.schoolRepository.find({
      where: { status: true },
    });

    return schools;
  }

  async findOne(id: string) {

    let school: School;

    if (isUUID(id)) {
      school = await this.schoolRepository.findOneBy({ idSchool: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!school) {
      throw new NotFoundException(`School with id: ${id}, not found.`);
    }

    return school;
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto, user: User) {
    try {

      const school = await this.schoolRepository.findOneBy({ idSchool: id });

      if (!school) {
        throw new NotFoundException(`School plan with ID '${id}' not found.`);
      }

      Object.assign(school, updateSchoolDto);
      school.updatedAt = new Date();
      school.user = user;

      await this.schoolRepository.save(school);

      return school;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string, user: User) {
    try {
      const school = await this.schoolRepository.findOneBy({ idSchool: id });

      if (!school) {
        throw new NotFoundException(`School plan with ID '${id}' not found.`);
      }

      // Desactiva el plan de suscripción y actualiza los campos correspondientes
      school.status = false;
      school.updatedAt = new Date();
      school.user = user;

      await this.schoolRepository.save(school);

      return {
        message: `Schhol with ID '${id}' has been deactivated.`,
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
