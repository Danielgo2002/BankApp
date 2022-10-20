import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from '../account/acount.shema';

export type DebtDocument = Debt & Document;

@Schema()
export class Debt {

  @Prop()
  money: number;

  @Prop()
  date: string;

  @Prop()
  comment: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sender' })
  sender: Account;

}

export const Debtschema = SchemaFactory.createForClass(Debt);