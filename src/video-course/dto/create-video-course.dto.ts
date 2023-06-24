import { IsString } from 'class-validator';

export class CreateVideoCourseDto {

    @IsString()
    title: string;
    
    @IsString()
    url: string;

}
