import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { Wishlist, WishlistSchema } from '../models/wishlist.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Wishlist.name, schema: WishlistSchema }])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
