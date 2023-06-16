import { PartialType } from '@nestjs/swagger';
import { CreateApplicationWebDto } from './create-application-web.dto';

export class UpdateApplicationWebDto extends PartialType(CreateApplicationWebDto) {}
