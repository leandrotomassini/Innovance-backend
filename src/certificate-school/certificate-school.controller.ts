import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificateSchoolService } from './certificate-school.service';
import { CreateCertificateSchoolDto } from './dto/create-certificate-school.dto';
import { UpdateCertificateSchoolDto } from './dto/update-certificate-school.dto';

@Controller('certificate-school')
export class CertificateSchoolController {
  constructor(private readonly certificateSchoolService: CertificateSchoolService) {}

  @Post()
  create(@Body() createCertificateSchoolDto: CreateCertificateSchoolDto) {
    return this.certificateSchoolService.create(createCertificateSchoolDto);
  }

  @Get()
  findAll() {
    return this.certificateSchoolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificateSchoolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCertificateSchoolDto: UpdateCertificateSchoolDto) {
    return this.certificateSchoolService.update(+id, updateCertificateSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificateSchoolService.remove(+id);
  }
}
