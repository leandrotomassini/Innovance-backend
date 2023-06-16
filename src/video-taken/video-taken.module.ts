import { Module } from '@nestjs/common';
import { VideoTakenService } from './video-taken.service';
import { VideoTakenController } from './video-taken.controller';

@Module({
  controllers: [VideoTakenController],
  providers: [VideoTakenService]
})
export class VideoTakenModule {}
