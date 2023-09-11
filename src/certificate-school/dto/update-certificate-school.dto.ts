import { PartialType } from '@nestjs/swagger';
import { CreateCertificateSchoolDto } from './create-certificate-school.dto';

export class UpdateCertificateSchoolDto extends PartialType(CreateCertificateSchoolDto) {}
