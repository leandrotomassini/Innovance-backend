import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { School } from 'src/school/entities/school.entity';



@Entity()
export class CertificateSchool {

    @PrimaryGeneratedColumn('uuid')
    idCertificateSchool: string;

    @ManyToOne(
        () => User,
        (user) => user.certificateSchool
    )
    user: User;


    @OneToMany(
        () => School,
        (school) => school.certificateSchool
    )
    school: School;

    @Column('boolean', {
        default: true
    })
    status: boolean;


}


