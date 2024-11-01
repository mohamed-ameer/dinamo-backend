import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { AuthRequest } from 'src/auth/dto/auth-request.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private emailService:EmailService) {}

    async create(createUserDto: CreateUserDto): Promise<any> {
        //make sure the email is unique
        const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
        if (existingUser) {
            throw new ConflictException('email already exists');
        }
        //create a new user and save it to the database with hashed password and registeration token 
        const createdUser = new this.userModel({...createUserDto});
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        createdUser.password = hashedPassword; 
        createdUser.registerationToken = crypto.randomUUID();
        //extract the password from the user object
        const { password, ...userWithoutPassword } = createdUser.toObject();
        //save the user to the database
        createdUser.save();
        this.emailService.sendSignUpEmail(createUserDto.email, createdUser.registerationToken);
        return userWithoutPassword;
    }

    comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
    async validateToken(token: string, operation: AuthRequest['operation']): Promise<User> {
        const user = await this.userModel.findOne({ registerationToken: token }).exec();
        if (!user) {
            throw new BadRequestException('Invalid token');
        }
        if (operation === 'register' && user.registerationToken !== token) {
            throw new BadRequestException('Invalid token');
        }
        if (operation === 'login' && user.registerationToken !== token) {
            throw new BadRequestException('Invalid token');
        }
        if (operation === 'register' && user.registerationToken === token) {
            user.registerationToken = null;
            user.save();
        }
        if (operation === 'login' && user.registerationToken === token) {
            user.registerationToken = null;
            user.save();
        }
        return user;
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
