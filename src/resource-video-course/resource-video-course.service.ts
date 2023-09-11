import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateResourceVideoCourseDto } from './dto/create-resource-video-course.dto';
import { UpdateResourceVideoCourseDto } from './dto/update-resource-video-course.dto';
import { ResourceVideoCourse } from './entities/resource-video-course.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class ResourceVideoCourseService {

  private readonly logger = new Logger('ResourceVideoCourseService');

  constructor(
    @InjectRepository(ResourceVideoCourse)
    private readonly resourceVideoCourseRepository: Repository<ResourceVideoCourse>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createResourceVideoCourseDto: CreateResourceVideoCourseDto) {
    try {
      const resourceVideoCourse = this.resourceVideoCourseRepository
        .create(createResourceVideoCourseDto);

      await this.resourceVideoCourseRepository.save(resourceVideoCourse);

      return createResourceVideoCourseDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {

    const resourceVideoCourse = await this.resourceVideoCourseRepository
      .find({
        where: { status: true },
      });

    return resourceVideoCourse;
  }

  async findOne(id: string) {

    let resourceVideoCourse: ResourceVideoCourse;

    if (isUUID(id)) {
      resourceVideoCourse = await this.resourceVideoCourseRepository
        .findOneBy({ idResourceVideoCourse: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!resourceVideoCourse) {
      throw new NotFoundException(`Resource video course with id: ${id}, not found.`);
    }

    return resourceVideoCourse;
  }

  async update(id: string, updateResourceVideoCourseDto: UpdateResourceVideoCourseDto) {
    try {
      const resourceVideoCourse = await this.resourceVideoCourseRepository
        .findOneBy({ idResourceVideoCourse: id });

      if (!resourceVideoCourse) {
        throw new NotFoundException(`Resource video course with ID '${id}' not found.`);
      }

      Object.assign(resourceVideoCourse, updateResourceVideoCourseDto);

      await this.resourceVideoCourseRepository.save(resourceVideoCourse);

      return resourceVideoCourse;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const resourceVideoCourse = await this.resourceVideoCourseRepository
        .findOneBy({ idResourceVideoCourse: id });

      if (!resourceVideoCourse) {
        throw new NotFoundException(`Resource video course with ID '${id}' not found.`);
      }

      resourceVideoCourse.status = false;

      await this.resourceVideoCourseRepository.save(resourceVideoCourse);

      return {
        message: `Resource video course with ID '${id}' has been deactivated.`,
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
