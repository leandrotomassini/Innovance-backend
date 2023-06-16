import { Module } from '@nestjs/common';
import { AskVideoService } from './ask-video.service';
import { AskVideoController } from './ask-video.controller';

@Module({
  controllers: [AskVideoController],
  providers: [AskVideoService]
})
export class AskVideoModule {}
