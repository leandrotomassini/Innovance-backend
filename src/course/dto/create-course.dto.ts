import { IsString } from 'class-validator';

export class CreateCourseDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    slug: string;

    @IsString()
    logo: string;

}
