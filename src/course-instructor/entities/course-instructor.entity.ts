import { Course } from 'src/course/entities/course.entity';
import { Instructor } from 'src/instructor/entities/instructor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CourseInstructor {


    @PrimaryGeneratedColumn('uuid')
    idCourseInstructor: string;

    @ManyToOne(
        () => Course,
        (course) => course.courseInstructor
    )
    course: Course;

    @ManyToOne(
        () => Instructor,
        (instructor) => instructor.courseInstructor
    )
    instructor: Instructor;

    @Column('boolean', {
        default: true
    })
    status: boolean;


}
