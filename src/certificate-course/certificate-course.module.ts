import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CertificateCourseService } from './certificate-course.service';
import { CertificateCourseController } from './certificate-course.controller';
import { CertificateCourse } from './entities/certificate-course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CertificateCourse])
  ],
  controllers: [CertificateCourseController],
  providers: [CertificateCourseService]
})
export class CertificateCourseModule {}
