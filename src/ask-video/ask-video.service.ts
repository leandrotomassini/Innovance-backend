import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateAskVideoDto } from './dto/create-ask-video.dto';
import { UpdateAskVideoDto } from './dto/update-ask-video.dto';
import { User } from 'src/auth/entities/user.entity';
import { AskVideo } from './entities/ask-video.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class AskVideoService {

  private readonly logger = new Logger('AskVideoService');

  constructor(
    @InjectRepository(AskVideo)
    private readonly askVideoRepository: Repository<AskVideo>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createAskVideoDto: CreateAskVideoDto, user: User) {
    try {

      const askVideo = this.askVideoRepository
        .create({
          ...createAskVideoDto,
          user
        });

      await this.askVideoRepository.save(askVideo);

      return ({
        askVideo
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {

    const askVideo = await this.askVideoRepository
      .find({
        where: { status: true },
      });

    return askVideo;
  }

  async findOne(id: string) {

    let askVideo: AskVideo;

    if (isUUID(id)) {
      askVideo = await this.askVideoRepository
        .findOneBy({ idAskVideo: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!askVideo) {
      throw new NotFoundException(`Ask video with id: ${id}, not found.`);
    }

    return askVideo;
  }

  async update(id: string, updateAskVideoDto: UpdateAskVideoDto, user: User) {

    const { ...toUpdate } = updateAskVideoDto;

    const askVideo = await this.askVideoRepository
      .preload({ idAskVideo: id, ...toUpdate });

    if (!askVideo)
      throw new NotFoundException(`Ask video with id ${id} not found.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(askVideo);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string, user: User) {
    try {
      const askVideo = await this.askVideoRepository
        .findOneBy({ idAskVideo: id });

      if (!askVideo) {
        throw new NotFoundException(`Ask video with ID '${id}' not found.`);
      }

      askVideo.status = false;

      await this.askVideoRepository.save(askVideo);

      return {
        message: `Ask video with ID '${id}' has been deactivated.`,
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