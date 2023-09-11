import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { School } from 'src/school/entities/school.entity';


@Entity()
export class SchoolTaken {

    @PrimaryGeneratedColumn('uuid')
    idSchoolTaken: string;


    @ManyToOne(
        () => School,
        (school) => school.schoolTaken
    )
    school: School;

    @ManyToOne(
        () => User,
        (user) => user.schoolTaken
    )
    user: User;

    @Column('boolean', {
        default: true
    })
    status: boolean;

}
