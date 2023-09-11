import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { ApplicationSubscriptionService } from './application-subscription.service';
import { CreateApplicationSubscriptionDto } from './dto/create-application-subscription.dto';
import { UpdateApplicationSubscriptionDto } from './dto/update-application-subscription.dto';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';


@Controller('application-subscription')
export class ApplicationSubscriptionController {

  constructor(private readonly applicationSubscriptionService: ApplicationSubscriptionService) {}

  @Auth(validRoles.admin)
  @Post()
  create(@Body() createApplicationSubscriptionDto: CreateApplicationSubscriptionDto) {
    return this.applicationSubscriptionService.create(createApplicationSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.applicationSubscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationSubscriptionService.findOne(id);
  }
  
  @Auth(validRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationSubscriptionDto: UpdateApplicationSubscriptionDto) {
    return this.applicationSubscriptionService.update(id, updateApplicationSubscriptionDto);
  }
  
  @Auth(validRoles.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationSubscriptionService.remove(id);
  }
}
