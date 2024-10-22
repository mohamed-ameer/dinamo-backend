import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Cart } from './cart.model';
import { Product } from './product.model';
import { Order } from './order.model';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: ['admin', 'vendor', 'customer'], default: 'customer' })
    role: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }] })
    cart: Cart;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
    wishlist: Product[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
    orders: Order[];

}

export const UserSchema = SchemaFactory.createForClass(User);
