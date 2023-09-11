import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { VideoTaken } from 'src/video-taken/entities/video-taken.entity';
import { AskVideo } from 'src/ask-video/entities/ask-video.entity';
import { ResourceVideoCourse } from 'src/resource-video-course/entities/resource-video-course.entity';
import { SectionCourseVideo } from 'src/section-course-video/entities/section-course-video.entity';

@Entity()
export class VideoCourse {

    @PrimaryGeneratedColumn('uuid')
    idVideo: string;

    @Column('text')
    title: string;
    
    @Column('text')
    url: string;

    @Column('text')
    link: string;

    @Column('text')
    thumbnailUrl: string;
    
    @Column('text')
    previewAnimation: string;

    @Column('text')
    description: string;
    
    @Column('text')
    number: string;

    @Column('boolean', {
        default: true
    })
    status: boolean;

    @OneToMany(
        () => VideoTaken,
        (videoTaken) => videoTaken.videoCourse
    )
    videoTaken: VideoTaken;

    @OneToMany(
        () => AskVideo,
        (askVideo) => askVideo.videoCourse
    )
    askVideo: AskVideo

    @OneToMany(
        () => ResourceVideoCourse,
        (resourceVideoCourse) => resourceVideoCourse.videoCourse
    )
    resourceVideoCourse: ResourceVideoCourse;


    @OneToMany(
        () => SectionCourseVideo,
        (sectionCourseVideo) => sectionCourseVideo.videoCourse
    )
    sectionCourseVideo: SectionCourseVideo;

}
