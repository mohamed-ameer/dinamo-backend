// wishlists.controller.ts
import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('wishlists')
@Controller('wishlists')
export class WishlistsController {
    constructor(private readonly wishlistsService: WishlistsService) {}


    @Post()
    @ApiOperation({ summary: 'Create a new wishlist' })
    async create(@Body() createWishlistDto: CreateWishlistDto) {
        return this.wishlistsService.create(createWishlistDto);
    }


    @Get(':userId')
    @ApiOperation({ summary: 'Get a user\'s wishlist' })
    async getWishlist(@Param('userId') userId: string) {
        return this.wishlistsService.findByUserId(userId);
    }


    @Patch(':userId/add-product/:productId')
    @ApiOperation({ summary: 'Add a product to a user\'s wishlist' })
    async addProduct(
        @Param('userId') userId: string,
        @Param('productId') productId: string
    ) {
        return this.wishlistsService.addProduct(userId, productId);
    }


    @Patch(':userId/remove-product/:productId')
    @ApiOperation({ summary: 'Remove a product from a user\'s wishlist' })
    async removeProduct(
        @Param('userId') userId: string,
        @Param('productId') productId: string
    ) {
        return this.wishlistsService.removeProduct(userId, productId);
    }
}
