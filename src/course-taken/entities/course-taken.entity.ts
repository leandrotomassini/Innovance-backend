import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from 'src/course/entities/course.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class CourseTaken {

    @PrimaryGeneratedColumn('uuid')
    idCourseTaken: string;

    @ManyToOne(
        () => Course,
        (course) => course.courseTaken
    )
    course: Course;

    @ManyToOne(
        () => User,
        (user) => user.courseTaken
    )
    user: User;

    @Column('boolean', {
        default: true
    })
    status: boolean;
}
