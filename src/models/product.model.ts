import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Vendor } from './vendor.model';
import { Review } from './review.model';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    category: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' })
    vendor: Vendor;

    @Prop({ required: true })
    stock: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
    ratings: Review[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
