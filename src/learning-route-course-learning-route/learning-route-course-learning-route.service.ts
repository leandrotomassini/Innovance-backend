import { Injectable } from '@nestjs/common';
import { CreateLearningRouteCourseLearningRouteDto } from './dto/create-learning-route-course-learning-route.dto';
import { UpdateLearningRouteCourseLearningRouteDto } from './dto/update-learning-route-course-learning-route.dto';

@Injectable()
export class LearningRouteCourseLearningRouteService {
  create(createLearningRouteCourseLearningRouteDto: CreateLearningRouteCourseLearningRouteDto) {
    return 'This action adds a new learningRouteCourseLearningRoute';
  }

  findAll() {
    return `This action returns all learningRouteCourseLearningRoute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learningRouteCourseLearningRoute`;
  }

  update(id: number, updateLearningRouteCourseLearningRouteDto: UpdateLearningRouteCourseLearningRouteDto) {
    return `This action updates a #${id} learningRouteCourseLearningRoute`;
  }

  remove(id: number) {
    return `This action removes a #${id} learningRouteCourseLearningRoute`;
  }
}
