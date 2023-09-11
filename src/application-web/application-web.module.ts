import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationWebService } from './application-web.service';
import { ApplicationWebController } from './application-web.controller';
import { ApplicationWeb } from './entities/application-web.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationWeb])],
  controllers: [ApplicationWebController],
  providers: [ApplicationWebService]
})
export class ApplicationWebModule {}
