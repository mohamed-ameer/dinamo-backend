// products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../models/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const newProduct = new this.productModel(createProductDto);
        return newProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findById(id: string): Promise<Product> {
        return this.productModel.findById(id).exec();
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndDelete(id).exec();
    }
}
