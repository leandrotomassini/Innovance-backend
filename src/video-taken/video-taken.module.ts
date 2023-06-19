import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideoTakenService } from './video-taken.service';
import { VideoTakenController } from './video-taken.controller';
import { VideoTaken } from './entities/video-taken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoTaken])
  ],
  controllers: [VideoTakenController],
  providers: [VideoTakenService]
})
export class VideoTakenModule {}
