import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from 'src/course/entities/course.entity';
import { Instructor } from 'src/instructor/entities/instructor.entity';


@Entity()
export class CourseInstructor {


    @PrimaryGeneratedColumn('uuid')
    idCourseInstructor: string;

    @ManyToOne(
        () => Course,
        (course) => course.courseInstructor,
        { eager: true }
    )
    course: Course;

    @ManyToOne(
        () => Instructor,
        (instructor) => instructor.courseInstructor,
        { eager: true }
    )
    instructor: Instructor;

    @Column('boolean', {
        default: true
    })
    status: boolean;


}
