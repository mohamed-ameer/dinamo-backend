import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
enum AuthOperation {
    register = 'register',
    login = 'login'
}
export class AuthRequest {
    @ApiProperty({ example: 'ssfhhjvgdhfnvu', description: 'The registeration token of the user' })
    @IsNotEmpty()
    token: string;
    @ApiProperty({ example: 'register', description: 'The operation to perform' })
    @IsEnum(AuthOperation, { message: 'Invalid operation' })
    operation:AuthOperation;
}