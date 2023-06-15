import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { SubscriptorPlan } from 'src/subscriptor-plan/entities/subscriptor-plan.entity';

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

    @Column('boolean', {
        default: true
    })
    status: boolean;

    @Column('int')
    duration: number;

    @ManyToOne(() => User, (user) => user.subscriptionPlan, { eager: true })
    user: User;

    @OneToMany(() => SubscriptorPlan, (subscriptorPlan) => subscriptorPlan.subscriptionPlan)
    subscriptorPlan: SubscriptorPlan[];

    @CreateDateColumn()
    updatedAt: Date;
}
