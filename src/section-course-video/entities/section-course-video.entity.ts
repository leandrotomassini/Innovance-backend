import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SectionCourse } from 'src/section-course/entities/section-course.entity';
import { VideoCourse } from '../../video-course/entities/video-course.entity';


@Entity()
export class SectionCourseVideo {

    @PrimaryGeneratedColumn('uuid')
    idSectionCourseVideo: string;

    @ManyToOne(
        () => SectionCourse,
        (sectionCourse) => sectionCourse.sectionCourseVideo
    )
    sectionCourse: SectionCourse;

    @ManyToOne(
        () => VideoCourse,
        (videoCourse) => videoCourse.sectionCourseVideo
    )
    videoCourse: VideoCourse;

    @Column('boolean', {
        default: true
    })
    status: boolean;

    @CreateDateColumn()
    updatedAt: Date;

}
