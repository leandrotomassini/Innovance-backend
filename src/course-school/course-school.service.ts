import { Injectable } from '@nestjs/common';
import { CreateCourseSchoolDto } from './dto/create-course-school.dto';
import { UpdateCourseSchoolDto } from './dto/update-course-school.dto';

@Injectable()
export class CourseSchoolService {
  create(createCourseSchoolDto: CreateCourseSchoolDto) {
    return 'This action adds a new courseSchool';
  }

  findAll() {
    return `This action returns all courseSchool`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseSchool`;
  }

  update(id: number, updateCourseSchoolDto: UpdateCourseSchoolDto) {
    return `This action updates a #${id} courseSchool`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseSchool`;
  }
}
