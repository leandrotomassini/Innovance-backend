import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

import { CourseInstructor } from '../../course-instructor/entities/course-instructor.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Instructor {

    @PrimaryGeneratedColumn('uuid')
    idInstructor:string;

    @Column('text')
    imgUrl: string;

    @Column('text')
    title: string;

    @Column('boolean', {
        default: true
    })
    status: boolean;

    @OneToMany(
        () => CourseInstructor,
        (courseInstructor) => courseInstructor.instructor
    )
    courseInstructor:CourseInstructor;

    @ManyToOne(
        () => User,
        (user) => user.instructor
    )
    user:User;

}
