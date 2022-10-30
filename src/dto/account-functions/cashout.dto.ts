import { IsNotEmpty, IsNumber, IsString } from "class-validator";


/**
 * @description this class responsible to defined what params we want to get in the body of the request
 * of the cashout route.    also check the type of the param sand if they must be provided
 */

export class cashout{

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