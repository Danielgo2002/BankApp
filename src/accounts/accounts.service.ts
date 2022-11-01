import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cashout, deposit, Transfer } from 'src/dto/account-functions';
import {  AccountDocument } from 'src/schemas/account/acount.shema';
import { Debt, DebtDocument, Debtschema } from 'src/schemas/debt/debt.schema';
import * as argon from 'argon2';


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
        console.log(findaccount);
        console.log('$$$$$$$$$$$$$$$$$$$$');
        const pop = await findaccount.populate('debts')
        console.log(pop);
        
        
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
         * there is id for the transfer action, sender and reciver
         */
        const debt = new this.DebtModel(transferDTO)
        debt.reciver = findaccount._id
        debt.sender = user.id
        user.debts.push(debt.id)
        findaccount.debts.push(debt.id)
        
        await user.save()
        await findaccount.save()
        await debt.save()

        
        return ` you passed ${transferDTO.money} dollars to ${transferDTO.gmail} now you have ${user.money} left in your account`

        // return updateaccount
        

    }

    /**
     * @description this function deposit ammount of money to our account based on the body
     * @param depositDTO contains the ammount of money we want to pass the gmail and type of action(deposit)
     * @param user use "AccountDocument" to make connection with the database
     * @returns the date and ammount of the deposit and the updated ammount in your account. also add the action to the debt arry
     */
    async Deposit(depositDTO: deposit, user: AccountDocument){
        depositDTO.date= new Date();


        const pwMatches = await argon.verify(user.hash,depositDTO.password);
        // if password incorrect throw exception
        if (!pwMatches)
          throw new ForbiddenException(
            'Credentials incorrect',
          );
        const emailmatch = await (user.gmail == depositDTO.gmail)
            if(!emailmatch)
            throw new ForbiddenException(
                'credentials incorrect'
        )

     
        
        

        const debt = new this.DebtModel(depositDTO)
        user.money += depositDTO.money
        user.debts.push(debt._id,)
        await user.save()
        await debt.save()
        
        return `you deposit at ${depositDTO.date}.amount of  ${depositDTO.money} into your account.
        now you have ${user.money} in your account`

        

       
    }

    /**
     * @description this function check the amount of money you have and the amount you want to cashout
     * and if you have enough money the action wil execut else we will get err
     * @param cashoutDTO the params we want to get in the req body (money,gmail,name....)
     * @param user use the "AccountDocument" to make connection with the data base
     * @returns 
     */ 
    async Cashout(cashoutDTO: cashout , user: AccountDocument){
        
        cashoutDTO.date = new Date();

        const pwMatches = await argon.verify(user.hash,cashoutDTO.password);
        // if password incorrect throw exception
        if (!pwMatches)
          throw new ForbiddenException(
            'Credentials incorrect',
          );
        
        const emailmatch = await (user.gmail == cashoutDTO.gmail)
          if(!emailmatch)
          throw new ForbiddenException(
              'credentials incorrect'
      )

          
        
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
