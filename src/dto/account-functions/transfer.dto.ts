import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Transfer {

    @IsNotEmpty()
    @IsNumber()
    money : number

    @IsNotEmpty()
    @IsString()
    gmail: string

    @IsNotEmpty()
    @IsString()
    password: string

}