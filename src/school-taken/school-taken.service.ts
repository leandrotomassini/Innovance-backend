import { Injectable } from '@nestjs/common';
import { CreateSchoolTakenDto } from './dto/create-school-taken.dto';
import { UpdateSchoolTakenDto } from './dto/update-school-taken.dto';

@Injectable()
export class SchoolTakenService {
  create(createSchoolTakenDto: CreateSchoolTakenDto) {
    return 'This action adds a new schoolTaken';
  }

  findAll() {
    return `This action returns all schoolTaken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schoolTaken`;
  }

  update(id: number, updateSchoolTakenDto: UpdateSchoolTakenDto) {
    return `This action updates a #${id} schoolTaken`;
  }

  remove(id: number) {
    return `This action removes a #${id} schoolTaken`;
  }
}
