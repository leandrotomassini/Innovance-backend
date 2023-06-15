import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { SubscriptorPlanService } from './subscriptor-plan.service';
import { CreateSubscriptorPlanDto } from './dto/create-subscriptor-plan.dto';
import { UpdateSubscriptorPlanDto } from './dto/update-subscriptor-plan.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('subscriptor')
export class SubscriptorPlanController {
  constructor(private readonly subscriptorPlanService: SubscriptorPlanService) { }

  @Auth()
  @Post()
  create(
    @Body() createSubscriptorPlanDto: CreateSubscriptorPlanDto,
    @GetUser() user: User
  ) {
    return this.subscriptorPlanService.create(createSubscriptorPlanDto, user);
  }

  @Get()
  findAll() {
    return this.subscriptorPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptorPlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptorPlanDto: UpdateSubscriptorPlanDto) {
    return this.subscriptorPlanService.update(+id, updateSubscriptorPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptorPlanService.remove(+id);
  }
}
