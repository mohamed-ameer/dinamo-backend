// carts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../models/cart.model'; // Ensure the path is correct
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
    constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

    async create(createCartDto: CreateCartDto): Promise<Cart> {
        const newCart = new this.cartModel(createCartDto);
        return newCart.save();
    }

    async findAll(): Promise<Cart[]> {
        return this.cartModel.find().exec();
    }

    async findById(id: string): Promise<Cart> {
        return this.cartModel.findById(id).exec();
    }

    async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
        return this.cartModel.findByIdAndUpdate(id, updateCartDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Cart> {
        return this.cartModel.findByIdAndDelete(id).exec();
    }
}
