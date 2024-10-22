// reviews.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from '../models/review.model'; // Ensure the path is correct
import { CreateReviewDto } from './dto/create-review.dto';


@Injectable()
export class ReviewsService {
    constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        const newReview = new this.reviewModel(createReviewDto);
        return newReview.save();
    }

    async findAll(): Promise<Review[]> {
        return this.reviewModel.find().exec();
    }

    async findById(id: string): Promise<Review> {
        return this.reviewModel.findById(id).exec();
    }

    async update(id: string, updateReviewDto: any): Promise<Review> {
        return this.reviewModel.findByIdAndUpdate(id, updateReviewDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Review> {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }
}
