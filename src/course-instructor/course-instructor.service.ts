import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCourseInstructorDto } from './dto/create-course-instructor.dto';
import { UpdateCourseInstructorDto } from './dto/update-course-instructor.dto';
import { CourseInstructor } from './entities/course-instructor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class CourseInstructorService {
  private readonly logger = new Logger('CourseInstructorService');

  constructor(
    @InjectRepository(CourseInstructor)
    private readonly courseInstructorRepository: Repository<CourseInstructor>,
  ) { }

  async create(createCourseInstructorDto: CreateCourseInstructorDto) {
    try {
      const courseInstructor = this.courseInstructorRepository.create(
        createCourseInstructorDto,
      );

      await this.courseInstructorRepository.save(courseInstructor);

      return createCourseInstructorDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const courseInstructors = await this.courseInstructorRepository
      .find({
        where: { status: true },
      });

    return courseInstructors;
  }

  async findByIdCourse(idCourse: string) {

    if (!isUUID(idCourse)) {
      throw new NotFoundException(`Invalid ID format: ${idCourse}`);
    }

    const courseInstructor = await this.courseInstructorRepository
      .find({
        where: {
          course: { idCourse },
          status: true
        },
        relations: ['course', 'instructor'],
      });

    if (!courseInstructor) {
      throw new NotFoundException(
        `Course-Instructor with course ID: ${idCourse} not found.`,
      );
    }

    return courseInstructor;
  }



  async update(id: string, updateCourseInstructorDto: UpdateCourseInstructorDto) {
    try {
      const courseInstructor = await this.courseInstructorRepository.findOne({
        where: { idCourseInstructor: id },
      });

      if (!courseInstructor) {
        throw new NotFoundException(
          `Course-instructor plan with ID '${id}' not found.`,
        );
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
        .findOne({
          where: { idCourseInstructor: id },
        });

      if (!courseInstructor) {
        throw new NotFoundException(
          `Course-instructor with ID '${id}' not found.`,
        );
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
    throw new InternalServerErrorException(
      'Unexpected error, check server logs.',
    );
  }
}
