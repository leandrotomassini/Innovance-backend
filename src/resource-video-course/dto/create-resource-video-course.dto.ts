import { IsString, IsUUID } from 'class-validator';

import { VideoCourse } from 'src/video-course/entities/video-course.entity';


export class CreateResourceVideoCourseDto {

    @IsUUID()
    videoCourse: VideoCourse;

    @IsString()
    title: string;
    
    @IsString()
    description: string;
    
    @IsString()
    url: string;

}
