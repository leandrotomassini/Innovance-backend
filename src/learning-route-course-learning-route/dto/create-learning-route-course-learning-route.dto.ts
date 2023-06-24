import { IsUUID } from 'class-validator';

import { Course } from 'src/course/entities/course.entity';
import { LearningRoute } from '../../learning-route/entities/learning-route.entity';

export class CreateLearningRouteCourseLearningRouteDto {

    @IsUUID()
    course: Course;
    
    @IsUUID()
    learningRoute: LearningRoute;

}
