import { Module } from '@nestjs/common';
import { CertificateSchoolService } from './certificate-school.service';
import { CertificateSchoolController } from './certificate-school.controller';

@Module({
  controllers: [CertificateSchoolController],
  providers: [CertificateSchoolService]
})
export class CertificateSchoolModule {}
