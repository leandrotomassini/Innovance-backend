import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ApplicationWeb } from '../../application-web/entities/application-web.entity';
import { SubscriptionPlan } from 'src/subscription-plan/entities/subscription-plan.entity';

@Entity()
export class ApplicationSubscription {

    @PrimaryGeneratedColumn('uuid')
    idApplicationSubscription: string;

    @Column('text')
    subscription: SubscriptionPlan;

    @ManyToOne(
        () => ApplicationWeb,
        (applicationWeb) => applicationWeb.applicationSubscription
    )
    applicationWeb: ApplicationWeb;

    @Column('boolean', {
        default: true
    })
    status:boolean;

    @ManyToOne(
        () => SubscriptionPlan,
        (subscriptionPlan) => subscriptionPlan.applicationSubscription
    )
    subscriptionPlan: SubscriptionPlan;
}
