import { Body, Controller, Post } from '@nestjs/common';
import { CreateDto, SignDto } from 'src/dto/account';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) {}

    @Post('signup')
    signup(@Body() CreateDto: CreateDto){
        return this.authservice.signup(CreateDto)
    }

    @Post('signin')
    signin(@Body() signDto: SignDto){
        return this.authservice.signin(signDto)
    }
}
