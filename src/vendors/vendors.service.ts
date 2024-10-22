// vendors.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor, VendorDocument } from '../models/vendor.model';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
    constructor(@InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>) {}

    async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
        const newVendor = new this.vendorModel(createVendorDto);
        return newVendor.save();
    }

    async findAll(): Promise<Vendor[]> {
        return this.vendorModel.find().exec();
    }

    async findById(id: string): Promise<Vendor> {
        return this.vendorModel.findById(id).exec();
    }

    async update(id: string, updateVendorDto: UpdateVendorDto): Promise<Vendor> {
        return this.vendorModel.findByIdAndUpdate(id, updateVendorDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Vendor> {
        return this.vendorModel.findByIdAndDelete(id).exec();
    }
}
