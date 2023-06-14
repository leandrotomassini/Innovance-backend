import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { SubscriptionPlanService } from './subscription-plan.service';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
import { User } from 'src/auth/entities/user.entity';
import { Auth, GetUser } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@Controller('subscription')
export class SubscriptionPlanController {
  constructor(private readonly subscriptionPlanService: SubscriptionPlanService) { }

  /**
   * Crea un nuevo plan de suscripción.
   * @param createSubscriptionPlanDto - Objeto DTO para crear el plan de suscripción.
   * @param user - Usuario autenticado.
   * @returns El nuevo plan de suscripción creado.
   */
  @Auth(validRoles.admin)
  @Post()
  create(
    @Body() createSubscriptionPlanDto: CreateSubscriptionPlanDto,
    @GetUser() user: User
  ) {
    return this.subscriptionPlanService.create(createSubscriptionPlanDto, user);
  }

  /**
   * Obtiene todos los planes de suscripción.
   * @returns Una lista de todos los planes de suscripción.
   */
  @Get()
  findAll() {
    return this.subscriptionPlanService.findAll();
  }

  /**
   * Obtiene un plan de suscripción por su ID.
   * @param id - ID del plan de suscripción.
   * @returns El plan de suscripción correspondiente al ID proporcionado.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionPlanService.findOne(id);
  }

  /**
   * Actualiza un plan de suscripción.
   * @param id - ID del plan de suscripción a actualizar.
   * @param updateSubscriptionPlanDto - Objeto DTO con los datos de actualización del plan de suscripción.
   * @param user - Usuario autenticado.
   * @returns El plan de suscripción actualizado.
   */
  @Auth(validRoles.admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionPlanDto: UpdateSubscriptionPlanDto,
    @GetUser() user: User
  ) {
    return this.subscriptionPlanService.update(id, updateSubscriptionPlanDto, user);
  }

  /**
   * Elimina un plan de suscripción.
   * @param id - ID del plan de suscripción a eliminar.
   * @param user - Usuario autenticado.
   * @returns El plan de suscripción eliminado.
   */
  @Auth(validRoles.admin)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.subscriptionPlanService.remove(id, user);
  }
}
