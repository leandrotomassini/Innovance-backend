import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AskVideoService } from './ask-video.service';
import { AskVideoController } from './ask-video.controller';
import { AskVideo } from './entities/ask-video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AskVideo])],
  controllers: [AskVideoController],
  providers: [AskVideoService]
})
export class AskVideoModule {}
