import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateLearningRouteCourseLearningRouteDto } from './dto/create-learning-route-course-learning-route.dto';
import { UpdateLearningRouteCourseLearningRouteDto } from './dto/update-learning-route-course-learning-route.dto';
import { LearningRouteCourseLearningRoute } from './entities/learning-route-course-learning-route.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class LearningRouteCourseLearningRouteService {

  private readonly logger = new Logger('LearningRouteCourseLearningRouteService');

  constructor(
    @InjectRepository(LearningRouteCourseLearningRoute)
    private readonly learningRouteCourseLearningRouteRepository: Repository<LearningRouteCourseLearningRoute>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createLearningRouteCourseLearningRouteDto: CreateLearningRouteCourseLearningRouteDto) {
    try {

      const learningRouteCourseLearningRoute = this.learningRouteCourseLearningRouteRepository
        .create(createLearningRouteCourseLearningRouteDto);

      await this.learningRouteCourseLearningRouteRepository
        .save(learningRouteCourseLearningRoute);

      return learningRouteCourseLearningRoute;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {

    const learningRouteCourseLearningRoute = await this.learningRouteCourseLearningRouteRepository.find({
      where: { status: true },
    });

    return learningRouteCourseLearningRoute;
  }

  async findOne(id: string) {

    let learningRouteCourseLearningRoute: LearningRouteCourseLearningRoute;

    if (isUUID(id)) {
      learningRouteCourseLearningRoute = await this.learningRouteCourseLearningRouteRepository
        .findOneBy({ idLearningRouteCourseLearningRoute: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!learningRouteCourseLearningRoute) {
      throw new NotFoundException(`Learning Route Course Learning Route with id: ${id}, not found.`);
    }

    return learningRouteCourseLearningRoute;
  }

  async update(id: string, updateLearningRouteCourseLearningRouteDto: UpdateLearningRouteCourseLearningRouteDto) {
    try {

      const learningRouteCourseLearningRoute = await this.learningRouteCourseLearningRouteRepository.findOneBy({ idLearningRouteCourseLearningRoute: id });

      if (!learningRouteCourseLearningRoute) {
        throw new NotFoundException(`Learning Route Course Learning Route with ID '${id}' not found.`);
      }

      Object.assign(learningRouteCourseLearningRoute, updateLearningRouteCourseLearningRouteDto);

      await this.learningRouteCourseLearningRouteRepository.save(learningRouteCourseLearningRoute);

      return learningRouteCourseLearningRoute;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const learningRouteCourseLearningRoute = await this.learningRouteCourseLearningRouteRepository
      .findOneBy({ idLearningRouteCourseLearningRoute: id });

      if (!learningRouteCourseLearningRoute) {
        throw new NotFoundException(`Learning Route Course Learning Route with ID '${id}' not found.`);
      }

      learningRouteCourseLearningRoute.status = false;

      await this.learningRouteCourseLearningRouteRepository.save(learningRouteCourseLearningRoute);

      return {
        message: `Learning Route Course Learning Route with ID '${id}' has been deactivated.`,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs.');
  }
}


// TODO: Revisar con postman