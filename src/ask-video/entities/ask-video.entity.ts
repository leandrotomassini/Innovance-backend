import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { VideoCourse } from 'src/video-course/entities/video-course.entity';

@Entity()
export class AskVideo {

    @PrimaryGeneratedColumn('uuid')
    idAskVideo: string;


    @ManyToOne(
        () => User,
        (user) => user.askVideo
    )
    user: User;

    @ManyToOne(
        () => VideoCourse,
        (videoCourse) => videoCourse.askVideo
    )
    videoCourse: VideoCourse;

    @Column('text')
    title: string;


    @Column('text')
    description: string;


    @Column('boolean', {
        default: true
    })
    status: boolean;

}
