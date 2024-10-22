import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel({createUserDto});
        return createdUser.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
        const hashedRefreshToken = refreshToken 
          ? await bcrypt.hash(refreshToken, 10)
          : null;
        await this.userModel.updateOne(
          { id: userId },
          { refreshToken: hashedRefreshToken }
        );
      }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async remove(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
