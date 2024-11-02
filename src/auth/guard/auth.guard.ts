import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, forwardRef, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { Model } from 'mongoose';
import { UserDocument } from 'src/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from 'src/models/token.model';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();      
        // Get token from cookie or headers
        const token = request.cookies?.token || request.headers['authorization']?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        const tokenDocument = await this.tokenModel.findOne({ token });
        if (!tokenDocument) {
            throw new UnauthorizedException('Invalid token');
        }
        const user = await this.tokenModel.findOne({ token }).populate('user').exec();
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }
        (request as any).user = user;
        return true;
    }}