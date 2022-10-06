import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { CreateDto, SignDto } from 'src/dto/account';
import { Account, AccountDocument } from 'src/schemas/account/acount.shema';
@Injectable()
export class AuthService {
    constructor(@InjectModel('Account') private readonly AccountModel: Model<AccountDocument>,
    private config: ConfigService){}
    async signup(CreateDto: CreateDto) {
        try {
          CreateDto.hash = await argon.hash(CreateDto.password);
          delete CreateDto.password
          const user = new this.AccountModel(CreateDto)
          await user.save()
          return user
        } catch (error) {
              console.log(error);
            }
          }
    
      async signin(signDto: SignDto) {
        // find the user by email
        const result = await this.AccountModel.find({gmail: signDto.gmail}).exec();
        // if user does not exist throw exception
        if (!result)
          throw new ForbiddenException(
            'Credentials incorrect',
          );
        const user = result[0]  
        // compare password
        const pwMatches = await argon.verify(user.hash,signDto.password);
        // if password incorrect throw exception
        if (!pwMatches)
          throw new ForbiddenException(
            'Credentials incorrect',
          );
          return user
      }
}
