import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateSectionCourseDto } from './dto/create-section-course.dto';
import { UpdateSectionCourseDto } from './dto/update-section-course.dto';
import { SectionCourse } from './entities/section-course.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class SectionCourseService {

  private readonly logger = new Logger('SectionCourseService');

  constructor(
    @InjectRepository(SectionCourse)
    private readonly sectionCourseRepository: Repository<SectionCourse>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createSectionCourseDto: CreateSectionCourseDto) {
    try {

      const sectionCourse = this.sectionCourseRepository
        .create({
          ...createSectionCourseDto
        });

      await this.sectionCourseRepository.save(sectionCourse);

      return ({
        sectionCourse
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {

    const sectionCourse = await this.sectionCourseRepository
      .find({
        where: { status: true },
      });

    return sectionCourse;
  }

  async findOne(id: string) {

    let sectionCourse: SectionCourse;

    if (isUUID(id)) {
      sectionCourse = await this.sectionCourseRepository
        .findOneBy({ sectionCourseId: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!sectionCourse) {
      throw new NotFoundException(`Section-Course with id: ${id}, not found.`);
    }

    return sectionCourse;
  }

  async findAllByCourseId(idCourse: string) {
    const sectionsCourse = await this.sectionCourseRepository
      .find({
        where: {
          status: true,
          course: { idCourse },
        },
      });

    return sectionsCourse;
  }

  async update(id: string, updateSectionCourseDto: UpdateSectionCourseDto) {

    const { ...toUpdate } = updateSectionCourseDto;

    const sectionCourse = await this.sectionCourseRepository
      .preload({ sectionCourseId: id, ...toUpdate });

    if (!sectionCourse)
      throw new NotFoundException(`Section Course with id ${id} not found.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(sectionCourse);
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

      const sectionCourse = await this.sectionCourseRepository
        .findOneBy({ sectionCourseId: id });

      if (!sectionCourse) {
        throw new NotFoundException(`Section course plan with ID '${id}' not found.`);
      }

      sectionCourse.status = false;

      await this.sectionCourseRepository.save(sectionCourse);

      return {
        message: `Section course with ID '${id}' has been deactivated.`,
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
