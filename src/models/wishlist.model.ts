import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.model'; 
import { Product } from './product.model';  
import mongoose from 'mongoose';

export type WishlistDocument = Wishlist & Document;

@Schema()
export class Wishlist {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
    products: Product[];
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
