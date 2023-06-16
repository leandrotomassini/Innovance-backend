import { Injectable } from '@nestjs/common';
import { CreateCourseInstructorDto } from './dto/create-course-instructor.dto';
import { UpdateCourseInstructorDto } from './dto/update-course-instructor.dto';

@Injectable()
export class CourseInstructorService {
  create(createCourseInstructorDto: CreateCourseInstructorDto) {
    return 'This action adds a new courseInstructor';
  }

  findAll() {
    return `This action returns all courseInstructor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseInstructor`;
  }

  update(id: number, updateCourseInstructorDto: UpdateCourseInstructorDto) {
    return `This action updates a #${id} courseInstructor`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseInstructor`;
  }
}
