import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto, SignDto } from 'src/dto/account';
import { AccountDocument } from 'src/schemas/account/acount.shema';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';

/**
 * @description "UsePipes" watch the requests in these routes and make sure that the exact information we want 
 * in the body will be passed.(built it in "main.ts" file, (class-validetor))
 */
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted:true  }))


/**
 * @description this class "AuthController" use the main route "auth" and inside the other routes.
 * the constructor make the bond with the "AuthService" file
 */
@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) {}

    /**
     * @description this route signup is charge on signup new accounts.
     * @param CreateDto based on "CreateDto". the params in the body we asked to provide to be able to
     * signup new account
     * @returns call the func "signup" that in the "authservice" file
     */
    @Post('signup')
    signup(@Body() CreateDto: CreateDto){
        return this.authservice.signup(CreateDto)
    }

    /**
     * @description this route signin is in charge of signin the accounts and give them new access token
     * @param signDto based on the params in the body we provide
     * @returns retrurn access and refresh token 
     */
    @Post('signin')
    signin(@Body() signDto: SignDto){
        return this.authservice.signin(signDto)
    }


    /**
     * @description this route is in charge to refresh the token uses the "UseGuards" and "GetUser" methods
     * @param account this make the connection with the databse  
     * @returns the function "refresh" from the "authservice" file and provide us a refresh token
     */
    @UseGuards(AuthGuard('ref'))
    @Get('refresh')
       refresh(@GetUser() account: AccountDocument){
       return this.authservice.refresh(account)
    }
}
