import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';


@Entity()
export class Notification {

    @PrimaryGeneratedColumn('uuid')
    idNotification: string;

    @ManyToOne(
        () => User,
        (user)=> user.notification
    )
    user: User;
    
    @CreateDateColumn()
    dateTime: Date;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column('text')
    url: string;

    @Column('boolean', {
        default: false
    })
    viewed: boolean;

    @Column('boolean', {
        default: true
    })
    status: boolean;

}
