import { Injectable } from '@nestjs/common';
import { CreateResourceVideoCourseDto } from './dto/create-resource-video-course.dto';
import { UpdateResourceVideoCourseDto } from './dto/update-resource-video-course.dto';

@Injectable()
export class ResourceVideoCourseService {
  create(createResourceVideoCourseDto: CreateResourceVideoCourseDto) {
    return 'This action adds a new resourceVideoCourse';
  }

  findAll() {
    return `This action returns all resourceVideoCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resourceVideoCourse`;
  }

  update(id: number, updateResourceVideoCourseDto: UpdateResourceVideoCourseDto) {
    return `This action updates a #${id} resourceVideoCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} resourceVideoCourse`;
  }
}
