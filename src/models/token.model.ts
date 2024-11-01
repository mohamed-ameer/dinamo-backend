import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.model';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ required: true })
    token: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
