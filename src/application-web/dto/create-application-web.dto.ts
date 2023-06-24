import { IsString } from 'class-validator';

export class CreateApplicationWebDto {
    
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    slug: string;
}
