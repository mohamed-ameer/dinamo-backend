import { ApiProperty } from '@nestjs/swagger';
export class CreateWishlistDto {
    @ApiProperty({ example: 'product id 1' })
    productId: string;
    @ApiProperty({ example: 'User id 1' })
    userId: string;
}
