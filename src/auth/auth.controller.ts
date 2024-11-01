import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest } from './dto/auth-request.dto';
import { Response , Request} from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LogInRequest } from './dto/login-request.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {} 
    
    @Post()
    @ApiOperation({ summary: 'Authenticate a user' })
    async handleAuth(@Body() body: AuthRequest, @Res({ passthrough: true }) response: Response) {
       const result = await this.authService.handleAuth(body);
       response.cookie('token', result.token, { expires: new Date(Date.now() + 900000), httpOnly: true });
       return result.user;
    }
    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    async handleLogin(@Body() body: LogInRequest, @Res({ passthrough: true }) response: Response) {
       const result = await this.authService.handleLogin(body);
       response.cookie('token', result.token, { expires: new Date(Date.now() + 900000), httpOnly: true });
       return result.user;
    }
    @Post('logout')
    @ApiOperation({ summary: 'Logout a user' })
    async handleLogout(@Res({ passthrough: true }) response: Response, @Req() request: Request) {
        await this.authService.deleteToken(request.cookies['token']);
        response.clearCookie('token');
        return { message : 'Logout successful' };
    }
    @Get('verify')
    async verifyUser(
        @Query() query: AuthRequest,
        @Res({ passthrough: true }) response: Response,
    ) {
            const result = await this.authService.verifyToken(query);
            response.cookie('token', result.token, { expires: new Date(Date.now() + 900000), httpOnly: true });
            return result.user;
    }

}
