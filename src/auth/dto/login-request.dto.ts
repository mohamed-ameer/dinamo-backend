import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
export class LogInRequest {
    @ApiProperty({ example: 'amer@gmail.com', description: 'The email of the user' })
    @IsEmail()
    email: string;
    @ApiProperty({ example: 'password', description: 'The password of the user' })
    @IsNotEmpty()
    password: string;
}