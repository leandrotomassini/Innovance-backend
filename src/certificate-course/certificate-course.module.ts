import { Module } from '@nestjs/common';
import { CertificateCourseService } from './certificate-course.service';
import { CertificateCourseController } from './certificate-course.controller';

@Module({
  controllers: [CertificateCourseController],
  providers: [CertificateCourseService]
})
export class CertificateCourseModule {}
