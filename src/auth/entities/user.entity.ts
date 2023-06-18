import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { SubscriptionPlan } from 'src/subscription-plan/entities/subscription-plan.entity';
import { SubscriptorPlan } from 'src/subscriptor-plan/entities/subscriptor-plan.entity';
import { School } from 'src/school/entities/school.entity';
import { SchoolTaken } from 'src/school-taken/entities/school-taken.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { CertificateSchool } from "src/certificate-school/entities/certificate-school.entity";


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

    @OneToMany(
        () => SchoolTaken,
        (schoolTaken) => schoolTaken.user
    )
    schoolTaken: SchoolTaken;


    @OneToMany(
        () => Notification,
        (notification) => notification.user
    )
    notification: Notification;

    @OneToMany(
        () => CertificateSchool,
        (certificateSchool) => certificateSchool.user
    )
    certificateSchool: CertificateSchool;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}

// TODO: Agregar los typeorm en module
