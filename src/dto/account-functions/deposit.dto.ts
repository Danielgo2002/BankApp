import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";


/**
 * @description this class defined how the params in the request body of the route deposit will look like 
 * the type of the para, and if it must provided
 */
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

 