import { Injectable } from '@nestjs/common';

import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolService {
  
  create(createSchoolDto: CreateSchoolDto) {

    return 'This action adds a new school';
  }

  findAll() {
    return `This action returns all school`;
  }

  findOne(id: string) {
    return `This action returns a #${id} school`;
  }

  update(id: string, updateSchoolDto: UpdateSchoolDto) {
    return `This action updates a #${id} school`;
  }

  remove(id: string) {
    return `This action removes a #${id} school`;
  }
}
