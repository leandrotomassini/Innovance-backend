import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { SubscriptionPlan } from 'src/subscription-plan/entities/subscription-plan.entity';
import { SubscriptorPlan } from 'src/subscriptor-plan/entities/subscriptor-plan.entity';
import { School } from 'src/school/entities/school.entity';
import { SchoolTaken } from 'src/school-taken/entities/school-taken.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { CertificateSchool } from "src/certificate-school/entities/certificate-school.entity";
import { Course } from "src/course/entities/course.entity";
import { CourseTaken } from "src/course-taken/entities/course-taken.entity";
import { VideoTaken } from "src/video-taken/entities/video-taken.entity";
import { CertificateCourse } from "src/certificate-course/entities/certificate-course.entity";
import { AskVideo } from "src/ask-video/entities/ask-video.entity";
import { LearningRoute } from "src/learning-route/entities/learning-route.entity";
import { Instructor } from "src/instructor/entities/instructor.entity";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(
        () => SubscriptionPlan,
        (subscriptionPlan) => subscriptionPlan.user
    )
    subscriptionPlan: SubscriptionPlan;

    @OneToMany(
        () => SubscriptorPlan,
        (subscriptorPlan) => subscriptorPlan.user
    )
    subscriptorPlan: SubscriptorPlan;

    @OneToMany(
        () => School,
        (school) => school.user
    )
    school: School;

    @OneToMany(
        () => SchoolTaken,
        (schoolTaken) => schoolTaken.user
    )
    schoolTaken: SchoolTaken;

    @OneToMany(
        () => Notification,
        (notification) => notification.user
    )
    notification: Notification;

    @OneToMany(
        () => CertificateSchool,
        (certificateSchool) => certificateSchool.user
    )
    certificateSchool: CertificateSchool;

    @OneToMany(
        () => Course,
        (course) => course.user
    )
    course: Course;

    @OneToMany(
        () => CourseTaken,
        (courseTaken) => courseTaken.user
    )
    courseTaken: CourseTaken;

    @OneToMany(
        () => VideoTaken,
        (videoTaken) => videoTaken.user
    )
    videoTaken: VideoTaken;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @OneToMany(
        () => CertificateCourse,
        (certificateCourse) => certificateCourse.user
    )
    certificateCourse: CertificateCourse;


    @OneToMany(
        () => AskVideo,
        (askVideo) => askVideo.user
    )
    askVideo: AskVideo;

    @OneToMany(
        () => LearningRoute,
        (learningRoute) => learningRoute.user
    )
    learningRoute: LearningRoute;

    @OneToMany(
        () => Instructor,
        (instructor) => instructor.user
    )
    instructor: Instructor

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}

