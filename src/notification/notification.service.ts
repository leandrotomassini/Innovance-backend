import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { isUUID } from 'class-validator';


@Injectable()
export class NotificationService {

  private readonly logger = new Logger('NotificationService');

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly dataSource: DataSource,
  ) { }


  async create(createNotificationDto: CreateNotificationDto) {
    try {
      const notification = this.notificationRepository
        .create(createNotificationDto);

      await this.notificationRepository.save(notification);

      return ({
        notification
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  async findAllByUser(idUser: string) {

    const notifications = await this.notificationRepository
      .find({
        where: { user: { id: idUser }, status: true },
        relations: ['user'],
      });

    return notifications;
  }


  async findOne(id: string, idUser: string) {

    let notification: Notification;

    if (isUUID(id)) {

      notification = await this.notificationRepository.findOneBy({
        idNotification: id,
        user: { id: idUser },
        status: true
      });

    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!notification) {
      throw new NotFoundException(`Notification with id: ${id}, not found.`);
    }

    return notification;
  }


  async markAsSeen(id: string, idUser: string) {

    const notification = await this.notificationRepository
      .preload({
        idNotification: id,
        user: { id: idUser },
        status: true
      });

    if (!notification)
      throw new NotFoundException(`Notification with id ${id} not found.`);

    notification.viewed = true;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(notification);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return notification;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }
  async remove(id: string, idUser: string) {

    const notification = await this.notificationRepository
      .preload({
        idNotification: id,
        user: { id: idUser },
        status: true
      });

    if (!notification)
      throw new NotFoundException(`Notification with id ${id} not found.`);

    notification.status = false;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(notification);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return notification;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
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
