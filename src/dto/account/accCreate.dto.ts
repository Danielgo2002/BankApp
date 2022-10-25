import { IsEmail, isNotEmpty, IsNotEmpty, IsString,  } from "class-validator";

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