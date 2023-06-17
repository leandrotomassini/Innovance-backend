import { User } from 'src/auth/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    @ManyToOne(
        () => User,
        (user) => user.school
    )
    user: User;

    @CreateDateColumn()
    updatedAt: Date;
}
