import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { AccountDocument } from 'src/schemas/account/acount.shema';
import { AccountsService } from './accounts.service';

@UseGuards(AuthGuard('jwt'))

@Controller('accounts')
export class AccountsController {
    constructor(private accountservice: AccountsService) {}

    @Post('transfer')
    Transfer(){
        return this.accountservice.Transfer()
    }

    
    @Post('deposit')
    Deposit(){
        return this.accountservice.Deposit()
    }

    
    @Post('cashout')
    Cashout(){
        return this.accountservice.Cashout()
    }

    @Get('me')
    getme(@GetUser() user: AccountDocument){
        return user
    }

}
