import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { LearningRouteCourseLearningRoute } from '../../learning-route-course-learning-route/entities/learning-route-course-learning-route.entity';

@Entity()
export class LearningRoute {

    @PrimaryGeneratedColumn('uuid')
    idLearningRoute: string;

    @OneToMany(
        () => User,
        (user) => user.learningRoute
    )
    user: User;

    @Column('text')
    title: string;

    @Column('boolean', {
        default: false
    })
    isOfficialRoute: boolean;

    @Column('boolean', {
        default: true
    })
    isPrivate: boolean;

    @Column('boolean', {
        default: true
    })
    status: boolean;

    @OneToMany(
        () => LearningRouteCourseLearningRoute,
        (learningRouteCourseLearningRoute) => learningRouteCourseLearningRoute.learningRoute
    )
    learningRouteCourseLearningRoute: LearningRouteCourseLearningRoute;
}
