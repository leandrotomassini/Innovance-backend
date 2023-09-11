import { IsUUID } from 'class-validator';
import { SectionCourse } from 'src/section-course/entities/section-course.entity';
import { VideoCourse } from 'src/video-course/entities/video-course.entity';


export class CreateSectionCourseVideoDto {

    @IsUUID()
    sectionCourse: SectionCourse;
    
    @IsUUID()
    videoCourse: VideoCourse;
}
