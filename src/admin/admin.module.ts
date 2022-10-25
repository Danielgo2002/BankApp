import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from 'src/accounts/accounts.module';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account, Accountschema } from 'src/schemas/account/acount.shema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [JwtModule.register({}),MongooseModule.forFeature([{ name: Account.name, schema: Accountschema }])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
