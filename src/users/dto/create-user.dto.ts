import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
    name: string;
    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
    email: string;
    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    password: string;
    @ApiProperty({ example: 'customer', description: 'The role of the user' })
    role: string;
}
