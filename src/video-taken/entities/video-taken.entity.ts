import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { VideoCourse } from 'src/video-course/entities/video-course.entity';

@Entity()
export class VideoTaken {

    @PrimaryGeneratedColumn('uuid')
    idVideoTaken: string;

    @ManyToOne(
        () => VideoCourse,
        (videoCourse) => videoCourse.videoTaken
    )
    videoCourse: VideoCourse;

    @ManyToOne(
        () => User,
        (user) => user.videoTaken
    )
    user: User;

    @Column('boolean', {
        default: true
    })
    status: boolean;

}
