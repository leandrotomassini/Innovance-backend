import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from 'src/course/entities/course.entity';
import { LearningRoute } from 'src/learning-route/entities/learning-route.entity';



@Entity()
export class LearningRouteCourseLearningRoute {

    @PrimaryGeneratedColumn('uuid')
    idLearningRouteCourseLearningRoute: string;


    @ManyToOne(
        ()=> Course,
        (course) => course.learningRouteCourseLearningRoute
    )
    course: Course;

    @ManyToOne(
        () => LearningRoute,
        (learningRoute) => learningRoute.learningRouteCourseLearningRoute
    )
    learningRoute: LearningRoute;

    @Column('boolean', {
        default: true
    })
    status: boolean;
}
