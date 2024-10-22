// wishlists.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wishlist, WishlistDocument } from '../models/wishlist.model'; // Adjust path accordingly
import { CreateWishlistDto } from './dto/create-wishlist.dto';


@Injectable()
export class WishlistsService {
    constructor(@InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>) {}


    async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
        const wishlist = new this.wishlistModel(createWishlistDto);
        return wishlist.save();
    }


    async findByUserId(userId: string): Promise<Wishlist> {
        return this.wishlistModel.findOne({ userId }).exec();
    }


    async addProduct(userId: string, productId: string): Promise<Wishlist> {
        return this.wishlistModel.findOneAndUpdate(
            { userId },
            { $addToSet: { productIds: productId } },
            { new: true }
        ).exec();
    }

    async removeProduct(userId: string, productId: string): Promise<Wishlist> {
        return this.wishlistModel.findOneAndUpdate(
            { userId },
            { $pull: { productIds: productId } },
            { new: true }
        ).exec();
    }
}
