import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { SubscriptorPlan } from 'src/subscriptor-plan/entities/subscriptor-plan.entity';
import { ApplicationSubscription } from 'src/application-subscription/entities/application-subscription.entity';

@Entity()
export class SubscriptionPlan {
    @PrimaryGeneratedColumn('uuid')
    isSubscription: string;

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

    @OneToMany(
        () => SubscriptorPlan,
        (subscriptorPlan) => subscriptorPlan.subscriptionPlan
    )
    subscriptorPlan: SubscriptorPlan

    @CreateDateColumn()
    updatedAt: Date;

    @OneToMany(
        () => ApplicationSubscription,
        (applicationSubscription) => applicationSubscription.subscriptionPlan
    )
    applicationSubscription: ApplicationSubscription;

}
