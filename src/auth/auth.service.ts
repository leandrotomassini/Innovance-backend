import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto, UpdateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { isUUID } from 'class-validator';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }


  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });


      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }


  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository
      .findOne({
        where: { email },
        select: { email: true, password: true, id: true, fullName: true, isActive: true, roles: true }
      });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid.');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid.');

    return {
      user,
      token: this.getJwtToken({ id: user.id })
    };
  }


  checkAuthStatus(user: User) {

    return {
      user,
      token: this.getJwtToken({ id: user.id })
    }

  }

  async allUsers() {
    const users = await this.userRepository
      .find({
        where: { isActive: true },
      });

    return users;
  }


  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs.');

  }

  async findOne(id: string) {

    let user: User;

    if (isUUID(id)) {
      user = await this.userRepository.findOneBy({ id });
    } else {
      throw new NotFoundException(`Id: ${id} not found.`);
    }

    if (!user) {
      throw new NotFoundException(`User with id: ${id}, not found.`);
    }

    return user;
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    try {

      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException(`User with ID '${id}' not found.`);
      }

      Object.assign(user, updateUserDto);

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any): never {

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs.');
  }
}
