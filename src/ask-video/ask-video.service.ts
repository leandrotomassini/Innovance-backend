import { Injectable } from '@nestjs/common';
import { CreateAskVideoDto } from './dto/create-ask-video.dto';
import { UpdateAskVideoDto } from './dto/update-ask-video.dto';

@Injectable()
export class AskVideoService {
  create(createAskVideoDto: CreateAskVideoDto) {
    return 'This action adds a new askVideo';
  }

  findAll() {
    return `This action returns all askVideo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} askVideo`;
  }

  update(id: number, updateAskVideoDto: UpdateAskVideoDto) {
    return `This action updates a #${id} askVideo`;
  }

  remove(id: number) {
    return `This action removes a #${id} askVideo`;
  }
}
