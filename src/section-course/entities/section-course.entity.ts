    import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

    import { Course } from 'src/course/entities/course.entity';
    import { SectionCourseVideo } from 'src/section-course-video/entities/section-course-video.entity';

    @Entity()
    export class SectionCourse {

        @PrimaryGeneratedColumn('uuid')
        sectionCourseId: string;

        @ManyToOne(
            () => Course,
            (course) => course.sectionCourse
        )
        course: Course;

        @Column('text')
        sectionNumber: string;

        @Column('text')
        title: string;

        @Column('text')
        difficultyLevel: string;

        @Column('boolean', {
            default: true
        })
        status: boolean;

        @OneToMany(
            () => SectionCourseVideo,
            (sectionCourseVideo) => sectionCourseVideo.sectionCourse
        )
        sectionCourseVideo: SectionCourseVideo;

    }

