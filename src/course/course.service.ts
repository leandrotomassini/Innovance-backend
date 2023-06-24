import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { User } from 'src/auth/entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class CourseService {

  private readonly logger = new Logger('CourseService');

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createCourseDto: CreateCourseDto, user: User) {
    try {
      const course = this.courseRepository.create({
        ...createCourseDto,
        user: user,
      });

      await this.courseRepository.save(course);

      return createCourseDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const courses = await this.courseRepository.find({
      where: { status: true },
    });

    return courses;
  }

  async findOne(id: string) {
    let course: Course;

    if (isUUID(id)) {
      course = await this.courseRepository.findOneBy({ idCourse: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!course) {
      throw new NotFoundException(`Course with id: ${id}, not found.`);
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, user: User) {
    try {
      const course = await this.courseRepository.findOneBy({ idCourse: id });

      if (!course) {
        throw new NotFoundException(`Course plan with ID '${id}' not found.`);
      }

      Object.assign(course, updateCourseDto);
      course.updatedAt = new Date();
      course.user = user;

      await this.courseRepository.save(course);

      return course;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string, user: User) {
    try {

      const course = await this.courseRepository.findOneBy({ idCourse: id });

      if (!course) {
        throw new NotFoundException(`Course plan with ID '${id}' not found.`);
      }

      course.status = false;
      course.updatedAt = new Date();
      course.user = user;

      await this.courseRepository.save(course);

      return {
        message: `Course with ID '${id}' has been deactivated.`,
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