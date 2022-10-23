import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class deposit{

    @IsNotEmpty()
    @IsNumber()
    money: number

    @IsNotEmpty()
    @IsString()
    gmail: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    date: Date

    @IsNotEmpty()
    type: string
}

 