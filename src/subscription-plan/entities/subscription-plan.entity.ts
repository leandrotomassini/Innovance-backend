import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';


@Entity()
export class SubscriptionPlan {

    @PrimaryGeneratedColumn('uuid')
    id_subscription: string;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column('float')
    price: number;

    @Column('boolean')
    status: boolean;

    @Column('int')
    duration: number;

    @ManyToOne(
        () => User,
        (user) => user.subscriptionPlan,
        { eager: true }
    )
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}
