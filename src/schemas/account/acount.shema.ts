import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Debt, DebtDocument } from '../debt/debt.schema';

export type AccountDocument = Account & Document;

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

  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Debt' }]})
  debts: DebtDocument[];

}

export const Accountschema = SchemaFactory.createForClass(Account);