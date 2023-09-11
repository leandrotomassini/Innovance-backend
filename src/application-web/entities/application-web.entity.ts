import { ApplicationSubscription } from 'src/application-subscription/entities/application-subscription.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApplicationWeb {

    @PrimaryGeneratedColumn('uuid')
    idApplicationWeb: string;

    @Column('text')
    title: string;


    @Column('text')
    description: string;


    @Column('text')
    slug: string;


    @Column('boolean', {
        default: true
    })
    status: boolean;


    @OneToMany(
        () => ApplicationSubscription,
        (applicationSubscription) => applicationSubscription.applicationWeb
    )
    applicationSubscription: ApplicationSubscription
}
