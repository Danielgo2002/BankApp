import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Debt, DebtDocument } from '../debt/debt.schema';

/**
 * @description This Document define the users and allow to perform queries on the data-base
 */
export type AccountDocument = Account & Document;

/**
 * @description This shema define the users that log in into the bank system
 * the params that the account will have in the database 
 * also make bond with the Debt schema
 */
@Schema()
export class Account {
  @Prop({required: true})
  real_id: string

  @Prop({required: true})
  name: string

  @Prop({required: true,type:String, unique:true})
  gmail: string

  @Prop()
  password: string

  @Prop()
  hash: string

  @Prop({default: 0})
  money: number

  @Prop({default: false})
  isAdmin: boolean

  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Debt' }]})
  debts: DebtDocument[];

}

export const Accountschema = SchemaFactory.createForClass(Account);