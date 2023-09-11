import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateSchoolTakenDto } from './dto/create-school-taken.dto';
import { UpdateSchoolTakenDto } from './dto/update-school-taken.dto';
import { SchoolTaken } from './entities/school-taken.entity';
import { User } from 'src/auth/entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class SchoolTakenService {

  private readonly logger = new Logger('SchoolTakenService');

  constructor(
    @InjectRepository(SchoolTaken)
    private readonly schoolTakenRepository: Repository<SchoolTaken>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createSchoolTakenDto: CreateSchoolTakenDto, user: User) {
    try {

      const schoolTaken = this.schoolTakenRepository
        .create({
          ...createSchoolTakenDto,
          user
        });

      await this.schoolTakenRepository.save(schoolTaken);

      return ({
        schoolTaken
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const schoolsTaken = await this.schoolTakenRepository
      .find({
        where: { status: true },
      });

    return schoolsTaken;
  }

  async findOne(id: string, user: User) {

    let schoolTaken: SchoolTaken;

    if (isUUID(id)) {
      schoolTaken = await this.schoolTakenRepository
        .findOneBy({ idSchoolTaken: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!schoolTaken) {
      throw new NotFoundException(`School-taken with id: ${id}, not found.`);
    }

    return schoolTaken;
  }

  async update(id: string, updateSchoolTakenDto: UpdateSchoolTakenDto, user: User) {

    const { ...toUpdate } = updateSchoolTakenDto;

    const schoolTaken = await this.schoolTakenRepository
      .preload({ idSchoolTaken: id, ...toUpdate });

    if (!schoolTaken)
      throw new NotFoundException(`School-taken with id ${id} not found.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(schoolTaken);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string, user: User) {
    try {

      const schoolTaken = await this.schoolTakenRepository
      .findOneBy({ idSchoolTaken: id });

      if (!schoolTaken) {
        throw new NotFoundException(`School-taken with ID '${id}' not found.`);
      }

      schoolTaken.status = false;

      await this.schoolTakenRepository.save(schoolTaken);

      return {
        message: `School-taken with ID '${id}' has been deactivated.`,
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


// TODO: Verificar que al usuario le pertenezca la escula tomada
// TODO: Revisar con postman