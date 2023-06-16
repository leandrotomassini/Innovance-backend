import { Injectable } from '@nestjs/common';
import { CreateLearningRouteDto } from './dto/create-learning-route.dto';
import { UpdateLearningRouteDto } from './dto/update-learning-route.dto';

@Injectable()
export class LearningRouteService {
  create(createLearningRouteDto: CreateLearningRouteDto) {
    return 'This action adds a new learningRoute';
  }

  findAll() {
    return `This action returns all learningRoute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learningRoute`;
  }

  update(id: number, updateLearningRouteDto: UpdateLearningRouteDto) {
    return `This action updates a #${id} learningRoute`;
  }

  remove(id: number) {
    return `This action removes a #${id} learningRoute`;
  }
}
