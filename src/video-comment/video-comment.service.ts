import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateVideoCommentDto } from './dto/create-video-comment.dto';
import { UpdateVideoCommentDto } from './dto/update-video-comment.dto';
import { VideoComment } from './entities/video-comment.entity';
import { User } from 'src/auth/entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class VideoCommentService {

  private readonly logger = new Logger('VideoCommentService');

  constructor(
    @InjectRepository(VideoComment)
    private readonly videoCommentRepository: Repository<VideoComment>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createVideoComment: CreateVideoCommentDto, user: User) {

    try {

      const comment = this.videoCommentRepository.create({
        ...createVideoComment,
        user: user,
      });

      await this.videoCommentRepository.save(comment);

      return createVideoComment;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        this.handleDBExceptions(error);
      }
    }
  }

  async findAll() {
    const comments = await this.videoCommentRepository.find({
      where: { status: true },
    });

    return comments;
  }

  async findOne(id: string) {
    let comment: VideoComment;

    if (isUUID(id)) {
      comment = await this.videoCommentRepository
        .createQueryBuilder("comment")
        .where("comment.idComment = :id", { id })
        .leftJoinAndSelect("comment.user", "user")
        .getOne();
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!comment) {
      throw new NotFoundException(`Comment with id: ${id}, not found.`);
    }

    return comment;
  }


  async findAllByVideoId(idVideo: string) {

    const comments = await this.videoCommentRepository.find({
      where: { status: true, videoCourse: { idVideo } }
    });

    return comments;
  }

  async update(id: string, updateVideoComment: UpdateVideoCommentDto, user: User) {
    try {
      const comment = await this.videoCommentRepository
        .createQueryBuilder("comment")
        .where("comment.idComment = :id", { id })
        .leftJoinAndSelect("comment.user", "user")
        .getOne();

      if (!comment) {
        throw new NotFoundException(`Comentario con ID '${id}' no encontrado.`);
      }

      if (comment.user && (comment.user.id === user.id || user.roles.includes('admin'))) {
        Object.assign(comment, updateVideoComment);
        comment.updatedAt = new Date();
        comment.user = user;

        await this.videoCommentRepository.save(comment);

        return comment;
      } else {
        throw new BadRequestException('No tienes permiso para actualizar este comentario.');
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }



  async remove(id: string, user: User) {
    try {
      const comment = await this.videoCommentRepository
        .createQueryBuilder("comment")
        .where("comment.idComment = :id", { id })
        .leftJoinAndSelect("comment.user", "user")
        .getOne();
  
      if (!comment) {
        throw new NotFoundException(`Comentario con ID '${id}' no encontrado.`);
      }
  
      if (comment.user && (comment.user.id === user.id || user.roles.includes('admin'))) {
        comment.status = false;
        comment.updatedAt = new Date();
        comment.user = user;
  
        await this.videoCommentRepository.save(comment);
  
        return {
          message: `Comentario con ID '${id}' ha sido desactivado.`,
        };
      } else {
        throw new BadRequestException('No tienes permiso para eliminar este comentario.');
      }
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
