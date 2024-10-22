import { ApiProperty } from '@nestjs/swagger';
export class CreateCartDto {
    @ApiProperty({ example: '1234567890' })
    userId: string;
    @ApiProperty({ example: [{ productId: '1234567890', quantity: 2 }] })
    items: {
        productId: string;
        quantity: number;
    }[];
    @ApiProperty({ example: 100.00 })
    totalPrice: number;    
}
