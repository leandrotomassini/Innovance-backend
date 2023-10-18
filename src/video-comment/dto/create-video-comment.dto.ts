import { IsString, IsUUID } from "class-validator";

import { User } from "src/auth/entities/user.entity";
import { VideoCourse } from "src/video-course/entities/video-course.entity";


export class CreateVideoCommentDto {

    @IsString()
    comment: string;
    
    @IsUUID()
    videoCourse: VideoCourse;


}
