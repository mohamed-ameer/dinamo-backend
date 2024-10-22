// orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../models/order.model'; // Ensure the path is correct
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const newOrder = new this.orderModel(createOrderDto);
        return newOrder.save();
    }

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async findById(id: string): Promise<Order> {
        return this.orderModel.findById(id).exec();
    }

    async update(id: string, updateOrderDto: any): Promise<Order> {
        return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Order> {
        return this.orderModel.findByIdAndDelete(id).exec();
    }
}
