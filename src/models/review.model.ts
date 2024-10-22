import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.model';
import { Product } from './product.model';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
    product: Product;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    comment: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
