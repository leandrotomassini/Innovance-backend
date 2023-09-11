import { PartialType } from '@nestjs/swagger';
import { CreateInstructorDto } from './create-instructor.dto';

import { IsBoolean, IsUUID } from 'class-validator';

export class UpdateInstructorDto extends PartialType(CreateInstructorDto) {

    @IsUUID()
    idInstructor: string;

    @IsBoolean()
    status: boolean;

}
