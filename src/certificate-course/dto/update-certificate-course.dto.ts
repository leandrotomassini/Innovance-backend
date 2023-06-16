import { PartialType } from '@nestjs/swagger';
import { CreateCertificateCourseDto } from './create-certificate-course.dto';

export class UpdateCertificateCourseDto extends PartialType(CreateCertificateCourseDto) {}
