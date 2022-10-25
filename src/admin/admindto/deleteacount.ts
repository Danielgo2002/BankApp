import { IsNotEmpty, IsString } from "class-validator";

export class deleteAccount{

    @IsNotEmpty()
    @IsString()
    gmail: string

    @IsNotEmpty()
    @IsString()
    name: string

}