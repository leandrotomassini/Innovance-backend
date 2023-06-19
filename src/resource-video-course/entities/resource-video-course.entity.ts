import { VideoCourse } from 'src/video-course/entities/video-course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResourceVideoCourse {

    @PrimaryGeneratedColumn('uuid')
    idResourceVideoCourse: string;

    @ManyToOne(
        () => VideoCourse,
        (videoCourse) => videoCourse.resourceVideoCourse
    )
    videoCourse: VideoCourse;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column('text')
    url: string;

    @Column('boolean', {
        default: true
    })
    status: boolean;

}
