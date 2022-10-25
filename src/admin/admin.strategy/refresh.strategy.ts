import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AccountDocument } from "src/schemas/account/acount.shema";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy,'refresh-admin'){
    constructor(@InjectModel('Account') private readonly AccountModel: Model<AccountDocument>,config: ConfigService ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('REFADMIN_SECRET'),
        })
    }


    async validate(payload: {sub: number, email: string }){

        const result = await this.AccountModel.findById(payload.sub)
        const account = result
        if(account.hash) delete account.hash
        return account
    }

}