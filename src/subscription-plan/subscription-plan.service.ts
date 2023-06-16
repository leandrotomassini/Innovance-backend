import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
import { SubscriptionPlan } from './entities/subscription-plan.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SubscriptionPlanService {
  private readonly logger = new Logger('SubscriptionPlanService');

  constructor(
    @InjectRepository(SubscriptionPlan)
    private readonly subscriptionRepository: Repository<SubscriptionPlan>,
    private readonly dataSource: DataSource,
  ) { }

  /**
   * Crea un nuevo plan de suscripción.
   * @param createSubscriptionPlanDto - Objeto DTO para crear el plan de suscripción.
   * @param user - Usuario asociado al plan de suscripción.
   * @returns El nuevo plan de suscripción creado.
   */
  async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto, user: User) {
    try {
      const subscriptionPlan = this.subscriptionRepository.create({
        ...createSubscriptionPlanDto,
        user: user,
      });

      await this.subscriptionRepository.save(subscriptionPlan);

      return createSubscriptionPlanDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Obtiene todos los planes de suscripción activos.
   * @returns Una lista de todos los planes de suscripción activos.
   */
  async findAll() {
    const subscriptionsPlan = await this.subscriptionRepository.find({
      where: { status: true },
    });

    return subscriptionsPlan;
  }

  /**
   * Obtiene un plan de suscripción por su ID.
   * @param id - ID del plan de suscripción.
   * @returns El plan de suscripción correspondiente al ID proporcionado.
   * @throws NotFoundException si no se encuentra el plan de suscripción.
   */
  async findOne(id: string) {
    let subscriptionPlan: SubscriptionPlan;

    if (isUUID(id)) {
      subscriptionPlan = await this.subscriptionRepository.findOneBy({ id_subscription: id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!subscriptionPlan) {
      throw new NotFoundException(`Subscription with id: ${id}, not found.`);
    }

    return subscriptionPlan;
  }


  /**
   * Actualiza un plan de suscripción.
   * @param id - ID del plan de suscripción a actualizar.
   * @param updateSubscriptionPlanDto - Objeto DTO con los datos de actualización del plan de suscripción.
   * @param user - Usuario asociado al plan de suscripción.
   * @returns El plan de suscripción actualizado.
   * @throws NotFoundException si no se encuentra el plan de suscripción.
   * @throws InternalServerErrorException si ocurre un error inesperado en la base de datos.
   */
  async update(id: string, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto, user: User) {
    try {
      const subscriptionPlan = await this.subscriptionRepository.findOneBy({ id_subscription: id });

      if (!subscriptionPlan) {
        throw new NotFoundException(`Subscription plan with ID '${id}' not found.`);
      }

      // Actualiza los campos del plan de suscripción
      Object.assign(subscriptionPlan, updateSubscriptionPlanDto);
      subscriptionPlan.updatedAt = new Date();
      subscriptionPlan.user = user;

      await this.subscriptionRepository.save(subscriptionPlan);

      return subscriptionPlan;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Desactiva un plan de suscripción.
   * @param id - ID del plan de suscripción a desactivar.
   * @param user - Usuario asociado al plan de suscripción.
   * @returns Un mensaje de confirmación de que el plan de suscripción ha sido desactivado.
   * @throws NotFoundException si no se encuentra el plan de suscripción.
   * @throws InternalServerErrorException si ocurre un error inesperado en la base de datos.
   */
  async remove(id: string, user: User) {
    try {
      const subscriptionPlan = await this.subscriptionRepository.findOneBy({ id_subscription: id });

      if (!subscriptionPlan) {
        throw new NotFoundException(`Subscription plan with ID '${id}' not found.`);
      }

      // Desactiva el plan de suscripción y actualiza los campos correspondientes
      subscriptionPlan.status = false;
      subscriptionPlan.updatedAt = new Date();
      subscriptionPlan.user = user;

      await this.subscriptionRepository.save(subscriptionPlan);

      return {
        message: `Subscription plan with ID '${id}' has been deactivated.`,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Maneja las excepciones relacionadas con la base de datos.
   * @param error - Error de base de datos.
   * @throws BadRequestException si ocurre un error de duplicidad.
   * @throws InternalServerErrorException si ocurre un error inesperado en la base de datos.
   */
  private handleDBExceptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs.');
  }
}



// TODO: Guardar el precio en el momento de comprar
// Chequear que se mantenga el usuario original que compro
// la subscripción, y no el usuario que actualiza como admin aveces.