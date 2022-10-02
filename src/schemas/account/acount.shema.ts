import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

}

export const Accountschema = SchemaFactory.createForClass(Account);