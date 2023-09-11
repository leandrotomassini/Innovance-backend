import { IsInt, IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateSubscriptionPlanDto {
    /**
     * Título del plan de suscripción.
     * Debe ser una cadena de texto con al menos 4 caracteres.
     */
    @IsString()
    @MinLength(4)
    title: string;

    /**
     * Descripción del plan de suscripción.
     * Debe ser una cadena de texto con al menos 4 caracteres.
     */
    @IsString()
    @MinLength(4)
    description: string;

    /**
     * Precio del plan de suscripción.
     * Debe ser un número positivo.
     */
    @IsNumber()
    @IsPositive()
    price: number;

    /**
     * Duración del plan de suscripción.
     * Debe ser un número entero positivo.
     */
    @IsInt()
    @IsPositive()
    duration: number;
}

