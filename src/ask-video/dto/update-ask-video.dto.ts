import { PartialType } from '@nestjs/swagger';
import { CreateAskVideoDto } from './create-ask-video.dto';

export class UpdateAskVideoDto extends PartialType(CreateAskVideoDto) {}
