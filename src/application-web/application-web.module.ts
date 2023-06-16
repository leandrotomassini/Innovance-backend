import { Module } from '@nestjs/common';
import { ApplicationWebService } from './application-web.service';
import { ApplicationWebController } from './application-web.controller';

@Module({
  controllers: [ApplicationWebController],
  providers: [ApplicationWebService]
})
export class ApplicationWebModule {}
