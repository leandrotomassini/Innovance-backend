import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 

import { SchoolTakenService } from './school-taken.service';
import { SchoolTakenController } from './school-taken.controller';
import { SchoolTaken } from './entities/school-taken.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolTaken]),
    AuthModule
  ],
  controllers: [SchoolTakenController],
  providers: [SchoolTakenService]
})
export class SchoolTakenModule { }
