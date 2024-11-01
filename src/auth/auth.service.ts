import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRequest } from './dto/auth-request.dto';
import { LogInRequest } from './dto/login-request.dto';
import { UsersService } from 'src/users/users.service';
import { Token, TokenDocument } from 'src/models/token.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>
    ) {}
    async handleAuth(request: AuthRequest) {
        const user = await this.usersService.validateToken(request.token, request.operation);
        const {_id, name, email, role} = user as UserDocument
        const token = await this.tokenModel.create({ token: crypto.randomUUID(), user: (user as UserDocument)._id }); 
        return {user: {_id, name, email, role}, token: token.token};
    }
    async verifyToken(query: AuthRequest) {
        const user = await this.usersService.validateToken(query.token, query.operation);
        const {_id, name, email, role} = user as UserDocument
        const token = await this.tokenModel.create({ token: crypto.randomUUID(), user: (user as UserDocument)._id }); 
        return {user: {_id, name, email, role}, token: token.token};
    }
    async deleteToken(token: string) {
        await this.tokenModel.deleteOne({token});
    }
    async handleLogin(LogInRequest: LogInRequest) {
        //check if user exists by email and password
        const user = await this.usersService.findByEmail(LogInRequest.email);
        if (!user) {
            throw new BadRequestException('User not found');
        }
        //check if password is correct
        const isPasswordCorrect = await this.usersService.comparePassword(LogInRequest.password, user.password);
        if (!isPasswordCorrect) {
            throw new BadRequestException('Invalid password');
        }
        //generate token
        const token = await this.tokenModel.create({ token: crypto.randomUUID(), user: (user as UserDocument)._id }); 
        const {_id, name, email, role} = user as UserDocument
        return {user: {_id, name, email, role}, token: token.token};
    }
}
