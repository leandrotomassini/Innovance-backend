import { Module } from '@nestjs/common';
import { SchoolTakenService } from './school-taken.service';
import { SchoolTakenController } from './school-taken.controller';

@Module({
  controllers: [SchoolTakenController],
  providers: [SchoolTakenService]
})
export class SchoolTakenModule {}
