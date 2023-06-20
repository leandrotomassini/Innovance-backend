import { IsUUID } from "class-validator";

import { Course } from "src/course/entities/course.entity";
import { School } from "src/school/entities/school.entity";


export class CreateCourseSchoolDto {

    @IsUUID()
    school: School;
    
    @IsUUID()
    course: Course;

}
