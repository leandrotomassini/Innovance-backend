import { IsUUID } from 'class-validator';
import { School } from 'src/school/entities/school.entity';

export class CreateSchoolTakenDto {

    @IsUUID()
    school: School;

}
