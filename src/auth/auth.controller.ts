import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  UnauthorizedException 
} from '@nestjs/common';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: any) {
    const user = await this.authService.register(createUserDto);
    return user;
  }
  

  @Post('login')
  async login(@Body() loginDto: any) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
      loginDto.appId,
    );
    
    if (!user) {
      throw new UnauthorizedException();
    }
    
    return this.authService.login(user);
  }

}