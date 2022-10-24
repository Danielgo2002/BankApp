import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto, SignDto } from 'src/dto/account';
import { AccountDocument } from 'src/schemas/account/acount.shema';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';

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

    @UseGuards(AuthGuard('ref'))
    @Get('refresh')
       refresh(@GetUser() account: AccountDocument){
       return this.authservice.refresh(account)
    }
}
