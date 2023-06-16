import { Injectable } from '@nestjs/common';
import { CreateApplicationWebDto } from './dto/create-application-web.dto';
import { UpdateApplicationWebDto } from './dto/update-application-web.dto';

@Injectable()
export class ApplicationWebService {
  create(createApplicationWebDto: CreateApplicationWebDto) {
    return 'This action adds a new applicationWeb';
  }

  findAll() {
    return `This action returns all applicationWeb`;
  }

  findOne(id: number) {
    return `This action returns a #${id} applicationWeb`;
  }

  update(id: number, updateApplicationWebDto: UpdateApplicationWebDto) {
    return `This action updates a #${id} applicationWeb`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicationWeb`;
  }
}
