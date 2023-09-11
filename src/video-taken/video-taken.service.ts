import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateVideoTakenDto } from './dto/create-video-taken.dto';
import { UpdateVideoTakenDto } from './dto/update-video-taken.dto';
import { VideoTaken } from './entities/video-taken.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class VideoTakenService {

  private readonly logger = new Logger('VideoTakenService');

  constructor(
    @InjectRepository(VideoTaken)
    private readonly videoTakenRepository: Repository<VideoTaken>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createVideoTakenDto: CreateVideoTakenDto) {
    try {

      const videoTaken = this.videoTakenRepository
        .create(createVideoTakenDto);

      await this.videoTakenRepository.save(videoTaken);

      return ({
        videoTaken
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const videoTaken = await this.videoTakenRepository
      .find({
        where: { status: true },
      });

    return videoTaken;
  }

  async findOne(id: string) {

    let videoTaken: VideoTaken;

    if (isUUID(id)) {
      videoTaken = await this.videoTakenRepository
        .findOneBy({ idVideoTaken: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!videoTaken) {
      throw new NotFoundException(`Video-taken with id: ${id}, not found.`);
    }

    return videoTaken;
  }

  async update(id: string, updateVideoTakenDto: UpdateVideoTakenDto) {

    const { ...toUpdate } = updateVideoTakenDto;

    const videoTaken = await this.videoTakenRepository
      .preload({ idVideoTaken: id, ...toUpdate });

    if (!videoTaken)
      throw new NotFoundException(`Video-taken with id ${id} not found.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(videoTaken);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {

      const videoTaken = await this.videoTakenRepository
        .findOneBy({ idVideoTaken: id });

      if (!videoTaken) {
        throw new NotFoundException(`Video-taken with ID '${id}' not found.`);
      }

      videoTaken.status = false;

      await this.videoTakenRepository.save(videoTaken);

      return {
        message: `Video-taken with ID '${id}' has been deactivated.`,
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

// TODO: Revisar con postman Y LE PERTENEZCA AL USUARIO