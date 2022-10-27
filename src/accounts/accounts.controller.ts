import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { cashout, deposit, Transfer } from 'src/dto/account-functions';
import { AccountDocument } from 'src/schemas/account/acount.shema';
import { AccountsService } from './accounts.service';


@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted:true  }))

/**
 * @description the "AuthGuard" determinate if request will be handle by route or not
 */
@UseGuards(AuthGuard('jwt'))


/**
 * @description the class "AccountsController" contains the name of the routes and make a bond with
 * the "AccountsService" file
 */

@Controller('accounts')
export class AccountsController {
    constructor(private accountservice: AccountsService) {}

    /**
     * @description this route transfer responsle to transfer money from account to other account 
     * @param user we use the "GetUser" to have the ability to find specific user and make bond with
     * detabase  by "AccountDocument"
     * @param transferDTO use "Body"  of the request based on the  "Transfer"
     * @returns the function "Transfer" we made in the "accountService" file 
     */
    @Post('transfer')
    Transfer(@GetUser() user: AccountDocument, @Body() transferDTO: Transfer){
        return this.accountservice.Transfer(transferDTO,user)
    }


    /**
     * @description the route deposit responsble on the action deposit(add money to the account)
     * @param user use the "GetUser" function to find specific user and make abond with database
     * @param depositDTO use "Body" of the request besed on the  "deposit"
     * @returns the function "Deposit" we made on the "accountService" file
     */
    @Post('deposit')
    Deposit(@GetUser() user: AccountDocument, @Body() depositDTO: deposit){
        return this.accountservice.Deposit(depositDTO,user)
    }


    /**
     * @description this route responsable to cashout the money from the acount
     * @param user use the "GetUser" function to find specific user and make abond with database
     * @param cashoutDTO use "Body" of the request besed on the  "cashout"
     * @returns the function "Cashout" we made on the "accountService" file
     */
    @Post('cashout')
    Cashout(@GetUser() user: AccountDocument, @Body() cashoutDTO: cashout){
        return this.accountservice.Cashout(cashoutDTO,user)
    }

    /**
     * @description this route find the user we asked (my own user)
     * @param user user the "GetUser" function and make connection with the database with "AccountDocument" 
     * @returns the user we asked based on the token we have provided
     */
    @Get('me')
    getme(@GetUser() user: AccountDocument){
        return user
    }

}
