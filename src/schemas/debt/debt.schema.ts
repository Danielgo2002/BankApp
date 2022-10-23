import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account, AccountDocument } from '../account/acount.shema';

export type DebtDocument = Debt & Document;

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
  sender: AccountDocument;

}

export const Debtschema = SchemaFactory.createForClass(Debt);