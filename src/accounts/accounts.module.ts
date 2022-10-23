import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule  } from '@nestjs/mongoose';
import { Account, Accountschema } from 'src/schemas/account/acount.shema';
import { Debt, Debtschema } from 'src/schemas/debt/debt.schema';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';


@Module({
imports: [JwtModule.register({}),MongooseModule.forFeature([{ name: Account.name, schema: Accountschema }]),MongooseModule.forFeature([{ name: Debt.name, schema: Debtschema }])],
controllers: [AccountsController],
providers: [AccountsService],
  
})
export class AccountModule {}
