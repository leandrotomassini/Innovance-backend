import { PartialType } from '@nestjs/swagger';
import { CreateVideoTakenDto } from './create-video-taken.dto';

export class UpdateVideoTakenDto extends PartialType(CreateVideoTakenDto) {}
