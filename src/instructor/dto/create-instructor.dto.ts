import { IsString, IsUUID } from 'class-validator';

import { User } from 'src/auth/entities/user.entity';

export class CreateInstructorDto {

    @IsString()
    imgUrl: string;
    
    @IsString()
    title: string;
    
    @IsUUID()
    user: User;

}
