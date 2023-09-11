import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { SubscriptorPlanService } from './subscriptor-plan.service';
import { CreateSubscriptorPlanDto } from './dto/create-subscriptor-plan.dto';
import { UpdateSubscriptorPlanDto } from './dto/update-subscriptor-plan.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { validRoles } from 'src/auth/interfaces';


@Controller('subscriptor')
export class SubscriptorPlanController {

  constructor(private readonly subscriptorPlanService: SubscriptorPlanService) { }


  @Post()
  @Auth()
  create(@Body() createSubscriptorPlanDto: CreateSubscriptorPlanDto, @GetUser() user: User) {
    return this.subscriptorPlanService.create(createSubscriptorPlanDto, user);
  }

  @Auth(validRoles.admin)
  @Get()
  findAll() {
    return this.subscriptorPlanService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.subscriptorPlanService.findOne(id);
  }

  @Auth(validRoles.admin)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSubscriptorPlanDto: UpdateSubscriptorPlanDto) {
    return this.subscriptorPlanService.update(id, updateSubscriptorPlanDto);
  }

  @Auth(validRoles.admin)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.subscriptorPlanService.remove(id);
  }
}
