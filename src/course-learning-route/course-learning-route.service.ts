import { Injectable } from '@nestjs/common';
import { CreateCourseLearningRouteDto } from './dto/create-course-learning-route.dto';
import { UpdateCourseLearningRouteDto } from './dto/update-course-learning-route.dto';

@Injectable()
export class CourseLearningRouteService {
  create(createCourseLearningRouteDto: CreateCourseLearningRouteDto) {
    return 'This action adds a new courseLearningRoute';
  }

  findAll() {
    return `This action returns all courseLearningRoute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseLearningRoute`;
  }

  update(id: number, updateCourseLearningRouteDto: UpdateCourseLearningRouteDto) {
    return `This action updates a #${id} courseLearningRoute`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseLearningRoute`;
  }
}
