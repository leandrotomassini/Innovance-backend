import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateLearningRouteDto } from './dto/create-learning-route.dto';
import { UpdateLearningRouteDto } from './dto/update-learning-route.dto';
import { LearningRoute } from './entities/learning-route.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class LearningRouteService {

  private readonly logger = new Logger('LearningRouteService');

  constructor(
    @InjectRepository(LearningRoute)
    private readonly learningRouteRepository: Repository<LearningRoute>,
    private readonly dataSource: DataSource,
  ) { }


  async create(createLearningRouteDto: CreateLearningRouteDto) {
    try {

      const learningRoute = this.learningRouteRepository
        .create(createLearningRouteDto);

      await this.learningRouteRepository.save(learningRoute);

      return createLearningRouteDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {

    const learningRoutes = await this.learningRouteRepository
      .find({
        where: { status: true },
      });

    return learningRoutes;
  }

  async findOne(id: string) {

    let learningRoute: LearningRoute;

    if (isUUID(id)) {
      learningRoute = await this.learningRouteRepository.findOneBy({ idLearningRoute: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!learningRoute) {
      throw new NotFoundException(`Learning route with id: ${id}, not found.`);
    }

    return learningRoute;
  }

  async update(id: string, updateLearningRouteDto: UpdateLearningRouteDto) {
    try {
      const learningRoute = await this.learningRouteRepository
        .findOneBy({ idLearningRoute: id });

      if (!learningRoute) {
        throw new NotFoundException(`Learning route plan with ID '${id}' not found.`);
      }

      Object.assign(learningRoute, updateLearningRouteDto);

      await this.learningRouteRepository.save(learningRoute);

      return learningRoute;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const learningRoute = await this.learningRouteRepository.findOneBy({ idLearningRoute: id });

      if (!learningRoute) {
        throw new NotFoundException(`Learning route with ID '${id}' not found.`);
      }

      learningRoute.status = false;

      await this.learningRouteRepository.save(learningRoute);

      return {
        message: `Learning route with ID '${id}' has been deactivated.`,
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


// TODO: REVISAR CON POSTMAN Y REVISAR QUE UN ADMIN PUEDA AGREGAR LA RUTA COMO OFICIAL
// TODO: Revisar que el usuario sea el dueño de la ruta