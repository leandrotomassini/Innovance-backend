import { Injectable } from '@nestjs/common';
import { CreateVideoCourseDto } from './dto/create-video-course.dto';
import { UpdateVideoCourseDto } from './dto/update-video-course.dto';

@Injectable()
export class VideoCourseService {
  create(createVideoCourseDto: CreateVideoCourseDto) {
    return 'This action adds a new videoCourse';
  }

  findAll() {
    return `This action returns all videoCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videoCourse`;
  }

  update(id: number, updateVideoCourseDto: UpdateVideoCourseDto) {
    return `This action updates a #${id} videoCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoCourse`;
  }
}
