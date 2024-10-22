// carts.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('carts')
@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new cart' })
    async create(@Body() createCartDto: CreateCartDto) {
        return this.cartsService.create(createCartDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all carts' })
    async findAll() {
        return this.cartsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a cart by ID' })
    async findOne(@Param('id') id: string) {
        return this.cartsService.findById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a cart by ID' })
    async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
        return this.cartsService.update(id, updateCartDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a cart by ID' })
    async remove(@Param('id') id: string) {
        return this.cartsService.remove(id);
    }
}
