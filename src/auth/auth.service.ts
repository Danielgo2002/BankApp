import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Model } from 'mongoose';
require("dotenv").config();
import { CreateDto, SignDto } from 'src/dto/account';
import { Account, AccountDocument } from 'src/schemas/account/acount.shema';
@Injectable()
export class AuthService {
    constructor(@InjectModel('Account') private readonly AccountModel: Model<AccountDocument>,
    private config: ConfigService, private jwt: JwtService){}
    async signup(CreateDto: CreateDto) {
        try {
          const existAccount = await this.AccountModel.findOne({gmail:CreateDto.gmail})
          if(existAccount){
           return 'dupllicate error'
          }


          CreateDto.hash = await argon.hash(CreateDto.password);
          delete CreateDto.password
          const user = new this.AccountModel(CreateDto)
          await user.save()
          const access_Token = await this.signToken(user.id,user.gmail)
          const refresh_Token = await this.refreshTokens(user.id,user.gmail)
          return {
            access_Token,
            refresh_Token
          }         
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
          const access_Token = await this.signToken(user.id,user.gmail)
          const refresh_Token = await this.refreshTokens(user.id,user.gmail)
          return {
            access_Token,
            refresh_Token
          }
          
      }

      async signToken(
        userid: string,
        email: string,
      ): Promise<{ access_token: string }> {
        const payload = {
          sub: userid,
          email,
        };
        const secret = this.config.get('JWT_SECRET');
    
        const token = await this.jwt.signAsync(
          payload,
          {
            expiresIn: '15m',
            secret: secret,
          },
        );
    
        return {
          access_token: token,
        };
      }

      async refreshTokens(
        userid : string,
        email: string,
        ): Promise<{ refresh_Token: string}>{
          const payload  = {
            sub: userid,
            email,
          };
          const secret = this.config.get('REF_SECRET');

          const token = await this.jwt.signAsync(
            payload,
            {
              expiresIn : '1d',
              secret: secret
            },
          );
          return {
            refresh_Token: token,
            }
        }

        async refresh(account){
          const access_Token = await this.signToken(account._id, account.email)
          return access_Token
        }
      
}
