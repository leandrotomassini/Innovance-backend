import { IsString } from 'class-validator';

export class CreateLearningRouteDto {

    @IsString()
    title: string;
    
    @IsString()
    isPrivate: boolean;
    
}
