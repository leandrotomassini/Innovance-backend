import { IsString } from 'class-validator';


export class CreateSchoolDto {

    @IsString()
    title: string;
    
    @IsString()
    description: string;
    
    @IsString()
    slug: string;

}
