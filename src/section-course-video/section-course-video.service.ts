import { Injectable } from '@nestjs/common';
import { CreateSectionCourseVideoDto } from './dto/create-section-course-video.dto';
import { UpdateSectionCourseVideoDto } from './dto/update-section-course-video.dto';

@Injectable()
export class SectionCourseVideoService {
  create(createSectionCourseVideoDto: CreateSectionCourseVideoDto) {
    return 'This action adds a new sectionCourseVideo';
  }

  findAll() {
    return `This action returns all sectionCourseVideo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sectionCourseVideo`;
  }

  update(id: number, updateSectionCourseVideoDto: UpdateSectionCourseVideoDto) {
    return `This action updates a #${id} sectionCourseVideo`;
  }

  remove(id: number) {
    return `This action removes a #${id} sectionCourseVideo`;
  }
}
