 import { IsNotEmpty, IsString } from "class-validator";

export class getAccount{

    @IsNotEmpty()
    @IsString()
    gmail: string

    @IsNotEmpty()
    @IsString()
    name: string
}