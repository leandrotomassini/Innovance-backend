import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateCertificateSchoolDto } from './dto/create-certificate-school.dto';
import { UpdateCertificateSchoolDto } from './dto/update-certificate-school.dto';
import { CertificateSchool } from './entities/certificate-school.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class CertificateSchoolService {

  private readonly logger = new Logger('CertificateSchoolService');

  constructor(
    @InjectRepository(CertificateSchool)
    private readonly certificateSchoolRepository: Repository<CertificateSchool>,
    private readonly dataSource: DataSource,
  ) { }


  async create(createCertificateSchoolDto: CreateCertificateSchoolDto) {
    try {
      const certificateSchool = this.certificateSchoolRepository
        .create(createCertificateSchoolDto);

      await this.certificateSchoolRepository.save(certificateSchool);

      return createCertificateSchoolDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const certificateSchool = await this.certificateSchoolRepository
      .find({
        where: { status: true },
      });

    return certificateSchool;
  }

  async findOne(id: string) {

    let certificateSchool: CertificateSchool;

    if (isUUID(id)) {
      certificateSchool = await this.certificateSchoolRepository
        .findOneBy({ idCertificateSchool: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!certificateSchool) {
      throw new NotFoundException(`Certificate school with id: ${id}, not found.`);
    }

    return certificateSchool;
  }

  async update(id: string, updateCertificateSchoolDto: UpdateCertificateSchoolDto) {
    try {
      const certificateSchool = await this.certificateSchoolRepository
        .findOneBy({ idCertificateSchool: id });

      if (!certificateSchool) {
        throw new NotFoundException(`Certificate course with ID '${id}' not found.`);
      }

      Object.assign(certificateSchool, updateCertificateSchoolDto);

      await this.certificateSchoolRepository.save(certificateSchool);

      return certificateSchool;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const certificateSchool = await this.certificateSchoolRepository
        .findOneBy({ idCertificateSchool: id });

      if (!certificateSchool) {
        throw new NotFoundException(`Certificate school with ID '${id}' not found.`);
      }

      certificateSchool.status = false;

      await this.certificateSchoolRepository
        .save(certificateSchool);

      return {
        message: `Certificate school with ID '${id}' has been deactivated.`,
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