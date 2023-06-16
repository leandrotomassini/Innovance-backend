import { Injectable } from '@nestjs/common';
import { CreateResourceCourseDto } from './dto/create-resource-course.dto';
import { UpdateResourceCourseDto } from './dto/update-resource-course.dto';

@Injectable()
export class ResourceCourseService {
  create(createResourceCourseDto: CreateResourceCourseDto) {
    return 'This action adds a new resourceCourse';
  }

  findAll() {
    return `This action returns all resourceCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resourceCourse`;
  }

  update(id: number, updateResourceCourseDto: UpdateResourceCourseDto) {
    return `This action updates a #${id} resourceCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} resourceCourse`;
  }
}
