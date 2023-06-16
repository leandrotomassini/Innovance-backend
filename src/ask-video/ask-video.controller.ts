import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AskVideoService } from './ask-video.service';
import { CreateAskVideoDto } from './dto/create-ask-video.dto';
import { UpdateAskVideoDto } from './dto/update-ask-video.dto';

@Controller('ask-video')
export class AskVideoController {
  constructor(private readonly askVideoService: AskVideoService) {}

  @Post()
  create(@Body() createAskVideoDto: CreateAskVideoDto) {
    return this.askVideoService.create(createAskVideoDto);
  }

  @Get()
  findAll() {
    return this.askVideoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.askVideoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAskVideoDto: UpdateAskVideoDto) {
    return this.askVideoService.update(+id, updateAskVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.askVideoService.remove(+id);
  }
}
