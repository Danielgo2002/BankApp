import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, Accountschema } from 'src/schemas/account/acount.shema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: Accountschema }])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
