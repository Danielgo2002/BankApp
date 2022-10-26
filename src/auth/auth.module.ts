import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, Accountschema } from 'src/schemas/account/acount.shema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { RefStrategy } from './strategy/ref.Strategy';
import { AccesStrategy, RefreshStrategy } from 'src/admin/admin.strategy';


@Module({
  imports: [JwtModule.register({}),MongooseModule.forFeature([{ name: Account.name, schema: Accountschema }])],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy, RefStrategy,AccesStrategy,RefreshStrategy],
})
export class AuthModule {}
