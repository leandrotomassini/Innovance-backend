import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateCertificateCourseDto } from './dto/create-certificate-course.dto';
import { UpdateCertificateCourseDto } from './dto/update-certificate-course.dto';
import { CertificateCourse } from './entities/certificate-course.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class CertificateCourseService {

  private readonly logger = new Logger('CertificateCourseService');

  constructor(
    @InjectRepository(CertificateCourse)
    private readonly certificateCourseRepository: Repository<CertificateCourse>,
    private readonly dataSource: DataSource,
  ) { }


  async create(createCertificateCourseDto: CreateCertificateCourseDto) {
    try {
      const certoficateCourse = this.certificateCourseRepository
        .create(createCertificateCourseDto);

      await this.certificateCourseRepository.save(certoficateCourse);

      return createCertificateCourseDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const certoficateCourse = await this.certificateCourseRepository
      .find({
        where: { status: true },
      });

    return certoficateCourse;
  }

  async findOne(id: string) {

    let certificateCourse: CertificateCourse;

    if (isUUID(id)) {
      certificateCourse = await this.certificateCourseRepository.findOneBy({ idCertificatedCourse: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!certificateCourse) {
      throw new NotFoundException(`Certificate course with id: ${id}, not found.`);
    }

    return certificateCourse;
  }

  async update(id: string, updateCertificateCourseDto: UpdateCertificateCourseDto) {
    try {
      const certificateCourse = await this.certificateCourseRepository
        .findOneBy({ idCertificatedCourse: id });

      if (!certificateCourse) {
        throw new NotFoundException(`Certificate course with ID '${id}' not found.`);
      }

      Object.assign(certificateCourse, updateCertificateCourseDto);

      await this.certificateCourseRepository.save(certificateCourse);

      return certificateCourse;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const certificateCourse = await this.certificateCourseRepository
        .findOneBy({ idCertificatedCourse: id });

      if (!certificateCourse) {
        throw new NotFoundException(`Certificate course with ID '${id}' not found.`);
      }

      certificateCourse.status = false;

      await this.certificateCourseRepository
        .save(certificateCourse);

      return {
        message: `Certificate course with ID '${id}' has been deactivated.`,
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


// TODO: revisar con postman