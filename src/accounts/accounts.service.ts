import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cashout, deposit, Transfer } from 'src/dto/account-functions';
import { Account, AccountDocument } from 'src/schemas/account/acount.shema';
import { Mongoose } from 'mongoose';
import { GetUser } from 'src/auth/decorator';


@Injectable()
export class AccountsService {
    constructor(@InjectModel('Account') private readonly AccountModel: Model<AccountDocument>,){}
    

     async Transfer(transferDTO: Transfer, user:AccountDocument){
        
        const findaccount = await this.AccountModel.findOne({gmail:transferDTO.gmail})
        if (!findaccount){
            return 'this account dosent exsist'
        }       
        const updateaccount = await this.AccountModel.findOne({gmail:transferDTO.gmail});
        
        if(user.money < transferDTO.money){
            return 'no money sorry' 
        }
        user.money-=  transferDTO.money

        updateaccount.money += transferDTO.money
        updateaccount.save()
        user.save()
        
        console.log(user);

        return updateaccount
        

    }
    
    async Deposit(depositDTO: deposit, user: AccountDocument){

        user.money += depositDTO.money
        user.save()

        return `you have now ${user.money} in your account`

       
    }

    
    async Cashout(cashoutDTO: cashout , user: AccountDocument){
        
        if(user.money < cashoutDTO.money){
            return 'you not have enough money'
        }

        user.money -= cashoutDTO.money
        user.save()

        return `you have now ${user.money} in your account`
    }




}
