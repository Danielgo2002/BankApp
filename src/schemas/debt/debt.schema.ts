import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from '../account/acount.shema';

export type DebtDocument = Debt & Document;

@Schema()
export class Debt {

  @Prop({required: true})
  money: number;

  @Prop({required: true})
  date: string;

  @Prop({required: true})
  name: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: Account;

}

export const Accountschema = SchemaFactory.createForClass(Debt);