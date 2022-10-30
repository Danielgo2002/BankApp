import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * @description this class defined the params we want to get in the body (used in the signin func authService)
 * check the type of the params in the body and if they shuld be provided
 */

export class SignDto{
  @IsNotEmpty()
  @IsEmail()
  gmail: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}