import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';

@Entity()
export class CertificateCourse {

    @PrimaryGeneratedColumn('uuid')
    idCertificatedCourse: string;

    @ManyToOne(
        () => Course,
        (course) => course.certificateCourse
    )
    course: Course;

    @ManyToOne(
        () => User,
        (user) => user.certificateCourse
    )
    user: User;

    @Column('boolean', {
        default: true
    })
    status: boolean;


}

