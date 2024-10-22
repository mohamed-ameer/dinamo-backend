import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.model';
import { Product } from './product.model';
import mongoose from 'mongoose';
export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], required: true })
    products: Product[];

    @Prop({ required: true })
    totalAmount: number;

    @Prop({ required: true })
    orderDate: Date;

    @Prop({ default: 'Pending' })
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
