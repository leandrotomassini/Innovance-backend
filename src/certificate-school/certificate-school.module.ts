import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CertificateSchoolService } from './certificate-school.service';
import { CertificateSchoolController } from './certificate-school.controller';
import { CertificateSchool } from './entities/certificate-school.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CertificateSchool]),
    AuthModule
  ],
  controllers: [CertificateSchoolController],
  providers: [CertificateSchoolService]
})
export class CertificateSchoolModule { }
