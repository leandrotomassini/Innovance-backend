import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class SubscriptorPlan {

    @PrimaryGeneratedColumn('uuid')
    idSubscriptor: string;

    @Column('text')
    dueDate: string;

    @Column('boolean', {
        default: true
    })
    status: boolean;

    @ManyToOne(() => User, (user) => user.subscriptorPlan, { eager: true })
    user: User;

}
