import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { VideoCourse } from 'src/video-course/entities/video-course.entity';

@Entity()
export class VideoComment {

    @PrimaryGeneratedColumn('uuid')
    idComment: string;

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

    @ManyToOne(
        () => VideoCourse,
        (videoCourse) => videoCourse.videoComment
    )
    videoCourse: VideoCourse;


    @Column('text')
    comment: string;
}
