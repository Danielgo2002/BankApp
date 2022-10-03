import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignDto{
  @IsNotEmpty()
  @IsEmail()
  gmail: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}