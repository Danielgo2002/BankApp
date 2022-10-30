import { IsNotEmpty, IsNumber, IsString } from "class-validator";

/**
 * @description this class defined hoe the params in the request body of the route transfer will look like
 * type of params and if must be provided
 */
export class Transfer {

    @IsNotEmpty()
    @IsNumber()
    money : number

    @IsNotEmpty()
    @IsString()
    gmail: string

    password: string

    date: Date

    @IsNotEmpty()
    type: string

}