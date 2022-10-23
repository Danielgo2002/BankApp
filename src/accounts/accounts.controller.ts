import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Allow } from 'class-validator';
import { GetUser } from 'src/auth/decorator';
import { cashout, deposit, Transfer } from 'src/dto/account-functions';
import { AccountDocument } from 'src/schemas/account/acount.shema';
import { Debt } from 'src/schemas/debt/debt.schema';
import { AccountsService } from './accounts.service';

@UseGuards(AuthGuard('jwt'))

@Controller('accounts')
export class AccountsController {
    constructor(private accountservice: AccountsService) {}

    @Post('transfer')
    Transfer(@GetUser() user: AccountDocument, @Body() transferDTO: Transfer){
        return this.accountservice.Transfer(transferDTO,user)
    }

    
    @Post('deposit')
    Deposit(@GetUser() user: AccountDocument, @Body() depositDTO: deposit){
        return this.accountservice.Deposit(depositDTO,user)
    }

    
    @Post('cashout')
    Cashout(@GetUser() user: AccountDocument, @Body() cashoutDTO: cashout){
        return this.accountservice.Cashout(cashoutDTO,user)
    }

    @Get('me')
    getme(@GetUser() user: AccountDocument){
        return user
    }

}
