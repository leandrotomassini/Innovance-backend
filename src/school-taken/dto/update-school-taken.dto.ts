import { PartialType } from '@nestjs/swagger';
import { CreateSchoolTakenDto } from './create-school-taken.dto';

export class UpdateSchoolTakenDto extends PartialType(CreateSchoolTakenDto) {}
