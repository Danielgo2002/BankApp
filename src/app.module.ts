import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsController } from './accounts/accounts.controller';
import { AccountModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, AccountModule, MongooseModule.forRoot('mongodb://localhost/nest',{
    autoIndex :true,
  }), AdminModule],

})
export class AppModule {}
