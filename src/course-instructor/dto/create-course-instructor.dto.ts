import { IsUUID } from 'class-validator';

import { Course } from 'src/course/entities/course.entity';
import { Instructor } from 'src/instructor/entities/instructor.entity';


export class CreateCourseInstructorDto {

    @IsUUID()
    course: Course;
    
    @IsUUID()
    instructor: Instructor;


}
