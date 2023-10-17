import { IsString } from "class-validator";


export class CreateVideoCommentDto {

    @IsString()
    comment: string;
}
