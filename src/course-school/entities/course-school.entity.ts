import { Course } from 'src/course/entities/course.entity';
import { School } from 'src/school/entities/school.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CourseSchool {

    @PrimaryGeneratedColumn('uuid')
    idCourseSchool: string;

    @ManyToOne(
        () => School,
        (school) => school.courseSchool
    )
    school: School;

    @ManyToOne(
        () => Course,
        (course) => course.courseSchool
    )
    course: Course;

    @Column('boolean', {
        default: true
    })
    status: boolean;

    @CreateDateColumn()
    updatedAt: Date;
}
