// orders.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    async create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all orders' })
    async findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an order by ID' })
    async findOne(@Param('id') id: string) {
        return this.ordersService.findById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an order by ID' })
    async update(@Param('id') id: string, @Body() updateOrderDto: any) {
        return this.ordersService.update(id, updateOrderDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an order by ID' })
    async remove(@Param('id') id: string) {
        return this.ordersService.remove(id);
    }
}
