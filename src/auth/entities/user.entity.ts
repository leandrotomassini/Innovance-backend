import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { SubscriptionPlan } from "src/subscription-plan/entities/subscription-plan.entity";
import { SubscriptorPlan } from "src/subscriptor-plan/entities/subscriptor-plan.entity";
import { School } from "src/school/entities/school.entity";



@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(
        () => SubscriptionPlan,
        (subscriptionPlan) => subscriptionPlan.user
    )
    subscriptionPlan: SubscriptionPlan;

    @OneToMany(
        () => SubscriptorPlan,
        (subscriptorPlan) => subscriptorPlan.user
    )
    subscriptorPlan: SubscriptorPlan;

    @OneToMany(
        () => School,
        (school) => school.user
    )
    school: School;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
