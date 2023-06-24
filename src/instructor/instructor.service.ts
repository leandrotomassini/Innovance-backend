import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { Instructor } from './entities/instructor.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class InstructorService {

  private readonly logger = new Logger('InstructorService');

  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
    private readonly dataSource: DataSource,
  ) { }


  async create(createInstructorDto: CreateInstructorDto) {
    try {
      const instructor = this.instructorRepository
        .create(createInstructorDto);

      await this.instructorRepository.save(instructor);

      return ({
        instructor
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {

    const instructors = await this.instructorRepository.find({
      where: { status: true },
    });

    return instructors;
  }

  async findOne(id: string) {

    let instructor: Instructor;

    if (isUUID(id)) {
      instructor = await this.instructorRepository.findOneBy({ idInstructor: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!instructor) {
      throw new NotFoundException(`Instructor with id: ${id}, not found.`);
    }

    return instructor;
  }

  async update(id: string, updateInstructorDto: UpdateInstructorDto) {
    try {

      const instructor = await this.instructorRepository.findOneBy({ idInstructor: id });

      if (!instructor) {
        throw new NotFoundException(`Instructor plan with ID '${id}' not found.`);
      }

      Object.assign(instructor, updateInstructorDto);

      await this.instructorRepository.save(instructor);

      return instructor;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const instructor = await this.instructorRepository.findOneBy({ idInstructor: id });

      if (!instructor) {
        throw new NotFoundException(`Instructor plan with ID '${id}' not found.`);
      }
     
      instructor.status = false;

      await this.instructorRepository.save(instructor);

      return {
        message: `Instructor plan with ID '${id}' has been deactivated.`,
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