import { IsUUID } from 'class-validator';
import { Course } from 'src/course/entities/course.entity';

export class CreateCourseTakenDto {

    @IsUUID()
    course: Course;

}
