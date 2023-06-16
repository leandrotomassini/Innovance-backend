import { Injectable } from '@nestjs/common';
import { CreateCertificateCourseDto } from './dto/create-certificate-course.dto';
import { UpdateCertificateCourseDto } from './dto/update-certificate-course.dto';

@Injectable()
export class CertificateCourseService {
  create(createCertificateCourseDto: CreateCertificateCourseDto) {
    return 'This action adds a new certificateCourse';
  }

  findAll() {
    return `This action returns all certificateCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} certificateCourse`;
  }

  update(id: number, updateCertificateCourseDto: UpdateCertificateCourseDto) {
    return `This action updates a #${id} certificateCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} certificateCourse`;
  }
}
