import { Injectable } from '@nestjs/common';
import { CreateCourseTakenDto } from './dto/create-course-taken.dto';
import { UpdateCourseTakenDto } from './dto/update-course-taken.dto';

@Injectable()
export class CourseTakenService {
  create(createCourseTakenDto: CreateCourseTakenDto) {
    return 'This action adds a new courseTaken';
  }

  findAll() {
    return `This action returns all courseTaken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseTaken`;
  }

  update(id: number, updateCourseTakenDto: UpdateCourseTakenDto) {
    return `This action updates a #${id} courseTaken`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseTaken`;
  }
}
