import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountDocument } from 'src/schemas/account/acount.shema';
import { getAccount } from './admindto';

@Injectable()
export class AdminService {
    constructor(@InjectModel('Account') private readonly AccountModel: Model<AccountDocument>){}
    
    async getAccount(getAccountDTO: getAccount, user: AccountDocument){
        const findaccount = await this.AccountModel.findOne({gmail:getAccountDTO.gmail})
        if (!findaccount) {
            return 'Account dosent exsist'
        }
        return findaccount
    }

    deleteAccount(){}

}
