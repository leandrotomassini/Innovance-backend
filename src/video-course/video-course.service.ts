import { Injectable, Logger, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateVideoCourseDto } from './dto/create-video-course.dto';
import { UpdateVideoCourseDto } from './dto/update-video-course.dto';
import { VideoCourse } from './entities/video-course.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class VideoCourseService {

  private readonly logger = new Logger('VideoCourseService');

  constructor(
    @InjectRepository(VideoCourse)
    private readonly videoCourseRepository: Repository<VideoCourse>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createVideoCourseDto: CreateVideoCourseDto) {

    try {
      const videoCourse = this.videoCourseRepository
        .create(createVideoCourseDto);

      await this.videoCourseRepository.save(videoCourse);

      return videoCourse; 
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {

    const videosCourse = await this.videoCourseRepository
      .find({
        where: { status: true },
      });

    return videosCourse;
  }

  async findOne(id: string) {

    let videoCourse: VideoCourse;

    if (isUUID(id)) {
      videoCourse = await this.videoCourseRepository.findOneBy({ idVideo: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!videoCourse) {
      throw new NotFoundException(`Video with id: ${id}, not found.`);
    }

    return videoCourse;
  }



  async update(id: string, updateVideoCourseDto: UpdateVideoCourseDto) {
    try {
      const videoCourse = await this.videoCourseRepository.findOneBy({ idVideo: id });

      if (!videoCourse) {
        throw new NotFoundException(`Video plan with ID '${id}' not found.`);
      }

      Object.assign(videoCourse, updateVideoCourseDto);

      await this.videoCourseRepository.save(videoCourse);

      return videoCourse;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {

    try {
      const videoCourse = await this.videoCourseRepository.findOneBy({ idVideo: id });

      if (!videoCourse) {
        throw new NotFoundException(`Video Course plan with ID '${id}' not found.`);
      }

      videoCourse.status = false;

      await this.videoCourseRepository.save(videoCourse);

      return {
        message: `Video Course with ID '${id}' has been deactivated.`,
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