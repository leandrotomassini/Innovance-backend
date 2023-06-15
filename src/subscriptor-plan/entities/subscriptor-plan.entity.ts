import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { SubscriptionPlan } from 'src/subscription-plan/entities/subscription-plan.entity';

@Entity()
export class SubscriptorPlan {
    
    @PrimaryGeneratedColumn('uuid')
    id_susbscriber: string;

    @OneToOne(
        () => User,
        (user) => user.subscriptorPlan,
        { eager: true }
    )
    user: User;

    @ManyToOne(
        () => SubscriptionPlan,
        (subscriptionPlan) => subscriptionPlan.subscriptorPlan,
        { eager: true }
    )
    subscriptionPlan: SubscriptionPlan;

    @Column('text')
    due_date: string;

    @Column('boolean', {
        default: true
    })
    status: boolean;

    @CreateDateColumn()
    updatedAt: Date;
}
