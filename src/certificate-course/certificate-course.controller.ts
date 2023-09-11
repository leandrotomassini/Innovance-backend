import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CertificateCourseService } from './certificate-course.service';
import { CreateCertificateCourseDto } from './dto/create-certificate-course.dto';
import { UpdateCertificateCourseDto } from './dto/update-certificate-course.dto';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@Controller('certificate-course')
export class CertificateCourseController {

  constructor(private readonly certificateCourseService: CertificateCourseService) { }

  @Auth(validRoles.admin)
  @Post()
  create(@Body() createCertificateCourseDto: CreateCertificateCourseDto) {
    return this.certificateCourseService.create(createCertificateCourseDto);
  }

  @Get()
  findAll() {
    return this.certificateCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificateCourseService.findOne(id);
  }

  @Auth(validRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCertificateCourseDto: UpdateCertificateCourseDto) {
    return this.certificateCourseService.update(id, updateCertificateCourseDto);
  }

  @Auth(validRoles.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificateCourseService.remove(id);
  }
}
