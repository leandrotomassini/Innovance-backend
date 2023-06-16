import { Injectable } from '@nestjs/common';
import { CreateCertificateSchoolDto } from './dto/create-certificate-school.dto';
import { UpdateCertificateSchoolDto } from './dto/update-certificate-school.dto';

@Injectable()
export class CertificateSchoolService {
  create(createCertificateSchoolDto: CreateCertificateSchoolDto) {
    return 'This action adds a new certificateSchool';
  }

  findAll() {
    return `This action returns all certificateSchool`;
  }

  findOne(id: number) {
    return `This action returns a #${id} certificateSchool`;
  }

  update(id: number, updateCertificateSchoolDto: UpdateCertificateSchoolDto) {
    return `This action updates a #${id} certificateSchool`;
  }

  remove(id: number) {
    return `This action removes a #${id} certificateSchool`;
  }
}
