import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { isUUID } from 'class-validator';

import { CreateCourseSchoolDto } from './dto/create-course-school.dto';
import { UpdateCourseSchoolDto } from './dto/update-course-school.dto';
import { CourseSchool } from './entities/course-school.entity';

// TODO: Revisar todos los métodos con postman

@Injectable()
export class CourseSchoolService {

  private readonly logger = new Logger('CourseSchoolService');

  constructor(
    @InjectRepository(CourseSchool)
    private readonly courseSchoolRepository: Repository<CourseSchool>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createCourseSchoolDto: CreateCourseSchoolDto) {
    try {

      const courseSchool = this.courseSchoolRepository
        .create({
          ...createCourseSchoolDto
        });

      await this.courseSchoolRepository.save(courseSchool);

      return ({
        courseSchool
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {

    const coursesSchools = await this.courseSchoolRepository.find({
      where: { status: true },
    });

    return coursesSchools;
  }

  async findOne(id: string) {

    let courseSchool: CourseSchool;

    if (isUUID(id)) {
      courseSchool = await this.courseSchoolRepository
        .findOneBy({ idCourseSchool: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!courseSchool) {
      throw new NotFoundException(`Course-School with id: ${id}, not found.`);
    }

    return courseSchool;
  }

  async update(id: string, updateCourseSchoolDto: UpdateCourseSchoolDto) {
    const { ...toUpdate } = updateCourseSchoolDto;

    const courseSchool = await this.courseSchoolRepository.preload({ idCourseSchool: id, ...toUpdate });

    if (!courseSchool)
      throw new NotFoundException(`Course-School with id ${id} not found.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(courseSchool);
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

      const courseSchool = await this.courseSchoolRepository.findOneBy({ idCourseSchool: id });

      if (!courseSchool) {
        throw new NotFoundException(`Course-School plan with ID '${id}' not found.`);
      }

      courseSchool.status = false;

      await this.courseSchoolRepository.save(courseSchool);

      return {
        message: `Course-School with ID '${id}' has been deactivated.`,
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