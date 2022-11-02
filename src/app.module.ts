import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';


/**
 * @description this file imports all the module file in the project like auth and account module tougether 
 * and make bond between them also create the bond with the mongo database(forRoot.....)
 */
@Module({
  imports: [AuthModule, AccountModule, MongooseModule.forRoot('mongodb://localhost/nest',{
    autoIndex :true,
  }), AdminModule],

})
export class AppModule {}
