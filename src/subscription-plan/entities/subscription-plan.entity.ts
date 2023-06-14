import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';

@Entity()
export class SubscriptionPlan {
    @PrimaryGeneratedColumn('uuid')
    id_subscription: string; // Identificador único generado automáticamente para cada plan de suscripción

    @Column('text')
    title: string; // Título del plan de suscripción

    @Column('text')
    description: string; // Descripción del plan de suscripción

    @Column('float')
    price: number; // Precio del plan de suscripción

    @Column('boolean', {
        default: true
    })
    status: boolean; // Estado del plan de suscripción (activo o inactivo)

    @Column('int')
    duration: number; // Duración del plan en meses.

    @ManyToOne(
        () => User,
        (user) => user.subscriptionPlan,
        { eager: true }
    )
    user: User; // Relación muchos a uno con el usuario que creó el plan de suscripción

    @CreateDateColumn()
    updatedAt: Date; // Fecha de la última actualización del plan de suscripción
}
