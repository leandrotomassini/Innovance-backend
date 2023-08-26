import { IsString } from 'class-validator';

export class CreateVideoCourseDto {

    @IsString()
    title: string;
    
    @IsString()
    url: string;
    
    @IsString()
    number: string;

    @IsString()
    link: string;

    @IsString()
    description: string;

    @IsString()
    thumbnailUrl: string;
    
    @IsString()
    previewAnimation: string;
    

}
