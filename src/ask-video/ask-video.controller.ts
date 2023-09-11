import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { AskVideoService } from './ask-video.service';
import { CreateAskVideoDto } from './dto/create-ask-video.dto';
import { UpdateAskVideoDto } from './dto/update-ask-video.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('ask-video')
export class AskVideoController {
  constructor(private readonly askVideoService: AskVideoService) {}

  @Auth()
  @Post()
  create(@Body() createAskVideoDto: CreateAskVideoDto, @GetUser() user: User) {
    return this.askVideoService.create(createAskVideoDto, user);
  }
  
  @Get()
  findAll() {
    return this.askVideoService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.askVideoService.findOne(id);
  }
  
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAskVideoDto: UpdateAskVideoDto, @GetUser() user: User) {
    return this.askVideoService.update(id, updateAskVideoDto, user);
  }
  
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.askVideoService.remove(id, user);
  }
}
