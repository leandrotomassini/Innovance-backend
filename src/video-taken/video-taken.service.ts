import { Injectable } from '@nestjs/common';
import { CreateVideoTakenDto } from './dto/create-video-taken.dto';
import { UpdateVideoTakenDto } from './dto/update-video-taken.dto';

@Injectable()
export class VideoTakenService {
  create(createVideoTakenDto: CreateVideoTakenDto) {
    return 'This action adds a new videoTaken';
  }

  findAll() {
    return `This action returns all videoTaken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videoTaken`;
  }

  update(id: number, updateVideoTakenDto: UpdateVideoTakenDto) {
    return `This action updates a #${id} videoTaken`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoTaken`;
  }
}
