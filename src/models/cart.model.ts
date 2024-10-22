import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.model';
import { Product } from './product.model';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
    items: Product[];

    @Prop({ required: true })
    totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
