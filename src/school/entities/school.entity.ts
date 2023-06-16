import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class School {

    @PrimaryGeneratedColumn('uuid')
    idSchool: string;

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
}
