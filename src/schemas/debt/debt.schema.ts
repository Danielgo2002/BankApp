import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account, AccountDocument } from '../account/acount.shema';


/**
 * @description This Document define the Debts and allow to perform queries on the data-base
 */
 
export type DebtDocument = Debt & Document;

/**
 * @description this class defined the params of the Debts that will fit inside the database
 * also make bond whit the account schema
 */
@Schema()
export class Debt {

  @Prop()
  money: number;

  @Prop()
  date: Date;

  @Prop()
  comment: string

  @Prop()
  isInCome: boolean

  @Prop()
  type: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  reciver: AccountDocument;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  sender: AccountDocument;

}

export const Debtschema = SchemaFactory.createForClass(Debt);