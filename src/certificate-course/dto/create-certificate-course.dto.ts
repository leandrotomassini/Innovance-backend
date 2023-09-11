import { IsUUID } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';

export class CreateCertificateCourseDto {

    @IsUUID()
    course: Course;

    @IsUUID()
    user: User;

}
