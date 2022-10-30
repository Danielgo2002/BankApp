import { IsEmail, IsNotEmpty, IsString,  } from "class-validator";
/**
 * @description this class is how we defined what we want params  to get in the body (usess basicly post req)
 * the decorator are watch the type of the dto and if it shuld be wroted (isnoetempty), used in the signup in the authservice
 */

export class CreateDto {

  @IsNotEmpty()
  @IsString()
  real_id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  gmail: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  isAdmin: boolean

  hash: string
}