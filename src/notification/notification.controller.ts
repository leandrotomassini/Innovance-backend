import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';


@Controller('notification')
export class NotificationController {

  constructor(private readonly notificationService: NotificationService) { }

  @Auth(validRoles.admin)
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User) {
    return this.notificationService.findAllByUser(user.id);
  }
  
  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.notificationService.findOne(id, user.id);
  }
  
  @Auth()
  @Patch(':id')
  markAsSeen(@Param('id') id: string, @GetUser() user: User) {
    return this.notificationService.markAsSeen(id, user.id);
  }
  
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.notificationService.remove(id, user.id);
  }
}
