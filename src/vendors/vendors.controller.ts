// vendors.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('vendors')
@Controller('vendors')
export class VendorsController {
    constructor(private readonly vendorsService: VendorsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new vendor' })
    async create(@Body() createVendorDto: CreateVendorDto) {
        return this.vendorsService.create(createVendorDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all vendors' })
    async findAll() {
        return this.vendorsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a vendor by ID' })
    async findOne(@Param('id') id: string) {
        return this.vendorsService.findById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a vendor by ID' })
    async update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
        return this.vendorsService.update(id, updateVendorDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a vendor by ID' })
    async remove(@Param('id') id: string) {
        return this.vendorsService.remove(id);
    }
}
