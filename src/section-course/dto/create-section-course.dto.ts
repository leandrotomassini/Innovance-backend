import { IsString, IsUUID } from 'class-validator';
import { Course } from 'src/course/entities/course.entity';



export class CreateSectionCourseDto {

    @IsUUID()
    course: Course;

    @IsString()
    sectionNumber: string;
    
    @IsString()
    title: string;
    
    @IsString()
    difficultyLevel: string;

}
