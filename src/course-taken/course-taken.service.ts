import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateCourseTakenDto } from './dto/create-course-taken.dto';
import { UpdateCourseTakenDto } from './dto/update-course-taken.dto';
import { CourseTaken } from './entities/course-taken.entity';
import { User } from 'src/auth/entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class CourseTakenService {

  private readonly logger = new Logger('CourseTakenService');

  constructor(
    @InjectRepository(CourseTaken)
    private readonly courseTakenRepository: Repository<CourseTaken>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createCourseTakenDto: CreateCourseTakenDto, user: User) {
    try {

      const courseTaken = this.courseTakenRepository
        .create({
          ...createCourseTakenDto,
          user
        });

      await this.courseTakenRepository.save(courseTaken);

      return ({
        courseTaken
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {

    const courseTaken = await this.courseTakenRepository
      .find({
        where: { status: true },
      });

    return courseTaken;
  }

  async findOne(id: string) {

    let courseTaken: CourseTaken;

    if (isUUID(id)) {
      courseTaken = await this.courseTakenRepository
        .findOneBy({ idCourseTaken: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!courseTaken) {
      throw new NotFoundException(`Course-Taken with id: ${id}, not found.`);
    }

    return courseTaken;
  }

  async update(id: string, updateCourseTakenDto: UpdateCourseTakenDto) {

    const { ...toUpdate } = updateCourseTakenDto;

    const courseTaken = await this.courseTakenRepository
      .preload({ idCourseTaken: id, ...toUpdate });

    if (!courseTaken)
      throw new NotFoundException(`Course Taken with id ${id} not found.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(courseTaken);
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

      const courseTaken = await this.courseTakenRepository
        .findOneBy({ idCourseTaken: id });

      if (!courseTaken) {
        throw new NotFoundException(`Course-Taken with ID '${id}' not found.`);
      }

      courseTaken.status = false;

      await this.courseTakenRepository.save(courseTaken);

      return {
        message: `Course-Taken with ID '${id}' has been deactivated.`,
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
// TODO: Probar con postman