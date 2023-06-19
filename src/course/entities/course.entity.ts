import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { CourseSchool } from 'src/course-school/entities/course-school.entity';
import { CourseTaken } from 'src/course-taken/entities/course-taken.entity';
import { CertificateCourse } from 'src/certificate-course/entities/certificate-course.entity';
import { SectionCourse } from 'src/section-course/entities/section-course.entity';
import { LearningRouteCourseLearningRoute } from 'src/learning-route-course-learning-route/entities/learning-route-course-learning-route.entity';
import { CourseInstructor } from 'src/course-instructor/entities/course-instructor.entity';

@Entity()
export class Course {

    @PrimaryGeneratedColumn('uuid')
    idCourse: string;

    @Column('text')
    title: string;
    
    @Column('text')
    description: string;
    
    @Column('text')
    slug: string;

    @Column('boolean', {
        default: true
    })
    status: boolean;

    @CreateDateColumn()
    updatedAt: Date;

    @ManyToOne(
        () => User,
        (user) => user.course
    )
    user: User;

    @OneToMany(
        () => CourseSchool,
        (courseSchool) => courseSchool.course
    )
    courseSchool: CourseSchool;

    @OneToMany(
        () => CourseTaken,
        (courseTaken) => courseTaken.course
    )
    courseTaken: CourseTaken;

    @OneToMany(
        ()=>CertificateCourse,
        (certificateCourse) => certificateCourse.course
    )
    certificateCourse: CertificateCourse;

    @OneToMany(
        () => SectionCourse,
        (sectionCourse) => sectionCourse.course
    )
    sectionCourse: SectionCourse;

    @OneToMany(
        () => LearningRouteCourseLearningRoute,
        (learningRouteCourseLearningRoute) => learningRouteCourseLearningRoute.course
    )
    learningRouteCourseLearningRoute: LearningRouteCourseLearningRoute;

    @OneToMany(
        () => CourseInstructor,
        (courseInstructor) => courseInstructor.course
    )
    courseInstructor: CourseInstructor
}
