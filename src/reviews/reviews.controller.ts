// reviews.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new review' })
    async create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(createReviewDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all reviews' })
    async findAll() {
        return this.reviewsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a review by ID' })
    async findOne(@Param('id') id: string) {
        return this.reviewsService.findById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a review by ID' })
    async update(@Param('id') id: string, @Body() updateReviewDto: any) {
        return this.reviewsService.update(id, updateReviewDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a review by ID' })
    async remove(@Param('id') id: string) {
        return this.reviewsService.remove(id);
    }
}
