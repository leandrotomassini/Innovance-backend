import { IsUUID } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { School } from 'src/school/entities/school.entity';


export class CreateCertificateSchoolDto {

    @IsUUID()
    user:User;
    
    @IsUUID()
    school: School;

}

