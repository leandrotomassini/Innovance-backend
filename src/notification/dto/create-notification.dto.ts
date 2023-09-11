import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsUUID, MinLength } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';

export class CreateNotificationDto {

    @IsString()
    @MinLength(4)
    title: string;

    @IsString()
    @MinLength(4)
    description: string;

    @IsString()
    @MinLength(4)
    url: string;

    @IsUUID()
    user: User;
}
