import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from './product.model';

export type VendorDocument = Vendor & Document;

@Schema()
export class Vendor {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
    products: Product[];

    
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
