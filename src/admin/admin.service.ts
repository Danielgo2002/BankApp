import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountDocument } from 'src/schemas/account/acount.shema';
import { deleteAccount, getAccount } from './admindto';

/**
 * @description the class "AdminService" make the connection with the database
 */


@Injectable()
export class AdminService {
    constructor(@InjectModel('Account') private readonly AccountModel: Model<AccountDocument>){}

    /**
     * 
     * @param getAccountDTO the data on the body based on "getAccount"
     * @param user AccountDocument to define a user
     * @returns if the getAccount was success it retrun the full user we asked in the body
     */
    
    async getAccount(getAccountDTO: getAccount, user: AccountDocument){
        const findaccount = await this.AccountModel.findOne({gmail:getAccountDTO.gmail})
        if (!findaccount) {
            return 'Account dosent exsist'
        }
        return findaccount
    }
    /**
     * @param deleteAccountDTO the data on the body based on  "deleteAccount"
     * @param user AccountDocument to define a user.
 *     @returns if the delete operation was succed
    */
    async deleteAccount(deleteAccountDTO: deleteAccount, user: AccountDocument){
        
        const findaccount = await this.AccountModel.findOne({gmail:deleteAccountDTO.gmail})
        if (!findaccount){
            return 'Account dosent exsist'
        }
        findaccount.delete()
        return " Account deleted!"

    }

}
