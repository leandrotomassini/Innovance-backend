import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import { CreateCourseInstructorDto } from './dto/create-course-instructor.dto';
import { UpdateCourseInstructorDto } from './dto/update-course-instructor.dto';
import { CourseInstructor } from './entities/course-instructor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { isUUID } from 'class-validator';


@Injectable()
export class CourseInstructorService {

  private readonly logger = new Logger('CourseInstructorService');

  constructor(
    @InjectRepository(CourseInstructor)
    private readonly courseInstructorRepository: Repository<CourseInstructor>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createCourseInstructorDto: CreateCourseInstructorDto) {
    try {
      const courseInstructor = this.courseInstructorRepository
        .create(createCourseInstructorDto);

      await this.courseInstructorRepository.save(courseInstructor);

      return createCourseInstructorDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const courseInstructor = await this.courseInstructorRepository
      .find({
        where: { status: true },
      });

    return courseInstructor;
  }

  async findOne(id: string) {

    let courseInstructor: CourseInstructor;

    if (isUUID(id)) {
      courseInstructor = await this.courseInstructorRepository
        .findOneBy({ idCourseInstructor: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!courseInstructor) {
      throw new NotFoundException(`Course-Instructor with id: ${id}, not found.`);
    }

    return courseInstructor;
  }


  async update(id: string, updateCourseInstructorDto: UpdateCourseInstructorDto) {
    try {
      const courseInstructor = await this.courseInstructorRepository
        .findOneBy({ idCourseInstructor: id });

      if (!courseInstructor) {
        throw new NotFoundException(`Course-instructor plan with ID '${id}' not found.`);
      }

      Object.assign(courseInstructor, updateCourseInstructorDto);

      await this.courseInstructorRepository.save(courseInstructor);

      return courseInstructor;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const courseInstructor = await this.courseInstructorRepository
        .findOneBy({ idCourseInstructor: id });

      if (!courseInstructor) {
        throw new NotFoundException(`Course-instructor with ID '${id}' not found.`);
      }

      courseInstructor.status = false;

      await this.courseInstructorRepository.save(courseInstructor);

      return {
        message: `Course-instructor plan with ID '${id}' has been deactivated.`,
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