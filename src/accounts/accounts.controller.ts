import { Controller, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

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
}
