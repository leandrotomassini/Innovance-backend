import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateSectionCourseVideoDto } from './dto/create-section-course-video.dto';
import { UpdateSectionCourseVideoDto } from './dto/update-section-course-video.dto';
import { SectionCourseVideo } from './entities/section-course-video.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class SectionCourseVideoService {

  private readonly logger = new Logger('SectionCourseVideoService');

  constructor(
    @InjectRepository(SectionCourseVideo)
    private readonly sectionCourseVideoRepository: Repository<SectionCourseVideo>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createSectionCourseVideoDto: CreateSectionCourseVideoDto) {
    try {
      const sectionCourseVideo = this.sectionCourseVideoRepository
        .create(createSectionCourseVideoDto);

      await this.sectionCourseVideoRepository
        .save(sectionCourseVideo);

      return createSectionCourseVideoDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  async findAll() {
    const sectionCourseVideos = await this.sectionCourseVideoRepository
      .find({
        where: { status: true },
        relations: ['videoCourse', 'sectionCourse'],
      });

    return sectionCourseVideos;
  }

  async findOne(id: string) {
    let sectionCourseVideo: SectionCourseVideo;

    if (isUUID(id)) {
      sectionCourseVideo = await this.sectionCourseVideoRepository
        .createQueryBuilder('sectionCourseVideo')
        .leftJoinAndSelect('sectionCourseVideo.videoCourse', 'videoCourse')
        .leftJoinAndSelect('sectionCourseVideo.sectionCourse', 'sectionCourse')
        .where('sectionCourseVideo.idSectionCourseVideo = :id', { id })
        .andWhere('sectionCourseVideo.status = true')
        .getOne();
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!sectionCourseVideo) {
      throw new NotFoundException(`Section course video with id: ${id}, not found.`);
    }

    return sectionCourseVideo;
  }

  async findBySectionId(idSection: string) {
    const sectionCourseVideos = await this.sectionCourseVideoRepository.find({
      where: {
        status: true,
        sectionCourse: { sectionCourseId: idSection }, // Aquí se establece la condición de búsqueda
      },
      relations: ['videoCourse', 'sectionCourse'],
    });

    return sectionCourseVideos;
  }

  async update(id: string, updateSectionCourseVideoDto: UpdateSectionCourseVideoDto) {
    try {

      const sectionCourseVideo = await this.sectionCourseVideoRepository
        .findOneBy({ idSectionCourseVideo: id });

      if (!sectionCourseVideo) {
        throw new NotFoundException(`Section course video with ID '${id}' not found.`);
      }

      Object.assign(sectionCourseVideo, updateSectionCourseVideoDto);

      await this.sectionCourseVideoRepository.save(sectionCourseVideo);

      return sectionCourseVideo;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const sectionCourseVideo = await this.sectionCourseVideoRepository
        .findOneBy({ idSectionCourseVideo: id });

      if (!sectionCourseVideo) {
        throw new NotFoundException(`Section course video plan with ID '${id}' not found.`);
      }

      sectionCourseVideo.status = false;

      await this.sectionCourseVideoRepository.save(sectionCourseVideo);

      return {
        message: `Section course video  plan with ID '${id}' has been deactivated.`,
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
