import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class AdminGuard implements CanActivate {
    constructor() {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();      
        // Get token from cookie or headers
        const role = (request as any).user?.user.role ;
        if(!role) {
            throw new UnauthorizedException('unauthorized');
        }
        if ( role !== 'admin') {
            throw new BadRequestException('admin only');
        }
        console.log("role", role);
        return true;
    }}