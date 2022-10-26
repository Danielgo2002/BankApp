import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cashout, deposit, Transfer } from 'src/dto/account-functions';
import {  AccountDocument } from 'src/schemas/account/acount.shema';
import { Debt, DebtDocument } from 'src/schemas/debt/debt.schema';

/**
 * @description the class AccountsService contain inside the actions we can do  in the "accounts " route
 * (transfer,deposit,cashout).
 * in the constructor we use "AccountDocument" and "DebtDocument" models to use their schemas
 */
@Injectable()
export class AccountsService {
    constructor(@InjectModel('Account') private readonly AccountModel: Model<AccountDocument>,@InjectModel('Debt') private readonly DebtModel: Model<DebtDocument>){}
    
    /**
     * @description this function Transferd money from one acount to other acount 
     * @param transferDTO use the body based on the "Transfer"(dto)
     * @param user  use "AccountDocument" to make conection with the database
     * @returns how much money we passed, who we passe, adn how much we have left
     */
     async Transfer(transferDTO: Transfer, user:AccountDocument){
        transferDTO.date = new Date();
        
        /**
         * @descriptiion find specific account based on the gmail we passed in the body and assign it to 
         * veriable "findaccount". if there in not  account we execut not found
         */
        const findaccount = await this.AccountModel.findOne({gmail:transferDTO.gmail})
        if (!findaccount){
            return 'this account dosent exsist'
        }
        /**
         * @description create another veriable "updateaccount" and assign it by the gmail we serch
         * in the body
         */       
        const updateaccount = await this.AccountModel.findOne({gmail:transferDTO.gmail});

        /**
         * @description check if the user have enough money to trensfer (user.money>transfer.amount)
         * @returns if user.money is less no money sorry
         * else it subtract the user.money and add theupdateaccount the money. 
         */
        if(user.money < transferDTO.money){
            return 'no money sorry' 
        }
        user.money-=  transferDTO.money
        
        updateaccount.money += transferDTO.money
        updateaccount.save()


        /**
         * @description create an veriable and assign it to new DebtModel then it push the debt to debts
         * arry by the id of the user
         */
        const debt = new this.DebtModel(transferDTO)
        user.debts.push(debt.id)
        findaccount.debts.push(debt.id)

        await user.save()
        await findaccount.save()
        await debt.save()

        
        return ` you passed ${transferDTO.money} dollars to ${transferDTO.gmail} now you have ${user.money} left in your account`

        // return updateaccount
        

    }

    /**
     * @description this function 
     * @param depositDTO 
     * @param user 
     * @returns 
     */
    async Deposit(depositDTO: deposit, user: AccountDocument){
        depositDTO.date= new Date();

        const debt = new this.DebtModel(depositDTO)
        user.money += depositDTO.money
        user.debts.push(debt._id)
        await user.save()
        await debt.save()

        
        return `you deposit at ${depositDTO.date}.amount of  ${depositDTO.money} into your account.
        now you have ${user.money} in your account`

        

       
    }



    
    async Cashout(cashoutDTO: cashout , user: AccountDocument){
        cashoutDTO.date = new Date();

        if(user.money < cashoutDTO.money){
            return 'you not have enough money'
        }
        user.money -= cashoutDTO.money
        const debt  = new this.DebtModel(cashoutDTO) 
        user.debts.push(debt._id)
        await user.save()
        await debt.save()

        return `you Cashout ${cashoutDTO.money} now you have ${user.money} in your account`
    }




}
