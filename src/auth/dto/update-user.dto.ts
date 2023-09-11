import { PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @MinLength(1)
    fullName: string;

    @IsOptional()
    isActive: boolean;

    @IsOptional()
    roles: string[];
}
