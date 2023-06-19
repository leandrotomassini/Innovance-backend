import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { SchoolTaken } from 'src/school-taken/entities/school-taken.entity';
import { CertificateSchool } from 'src/certificate-school/entities/certificate-school.entity';
import { CourseSchool } from 'src/course-school/entities/course-school.entity';


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

    @CreateDateColumn()
    updatedAt: Date;
   
    @Column('boolean', {
        default: true
    })
    status: boolean;

    @OneToMany(
        () => User,
        (user) => user.school
    )
    user: User;

    @ManyToOne(
        () => CertificateSchool,
        (certificateSchool) => certificateSchool.school
    )
    certificateSchool: CertificateSchool;

   @OneToMany(
    () => SchoolTaken,
    (schoolTaken) => schoolTaken.school
   )
   schoolTaken: SchoolTaken;


   @OneToMany(
    () => CourseSchool,
    (courseSchool) => courseSchool.school
   )
   courseSchool: CourseSchool;
}
