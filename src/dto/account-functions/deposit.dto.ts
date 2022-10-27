import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    
    @IsDate()
    date: Date

    @IsString()
    reciver: string

    @IsNotEmpty()
    type: string
}

 