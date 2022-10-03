import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Debt } from '../debt/debt.schema';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({required: true})
  real_id: string;

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  gmail: string;

  @Prop({required: true})
  password: string

  @Prop()
  hash: string

  @Prop({default: 0})
  money: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  debt: Debt[];

}

export const Accountschema = SchemaFactory.createForClass(Account);