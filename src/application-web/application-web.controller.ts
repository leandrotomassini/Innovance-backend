import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApplicationWebService } from './application-web.service';
import { CreateApplicationWebDto } from './dto/create-application-web.dto';
import { UpdateApplicationWebDto } from './dto/update-application-web.dto';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@Controller('application-web')
export class ApplicationWebController {

  constructor(private readonly applicationWebService: ApplicationWebService) { }

  @Auth(validRoles.admin)
  @Post()
  create(@Body() createApplicationWebDto: CreateApplicationWebDto) {
    return this.applicationWebService.create(createApplicationWebDto);
  }

  @Get()
  findAll() {
    return this.applicationWebService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationWebService.findOne(id);
  }

  @Auth(validRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationWebDto: UpdateApplicationWebDto) {
    return this.applicationWebService.update(id, updateApplicationWebDto);
  }

  @Auth(validRoles.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationWebService.remove(id);
  }
}
