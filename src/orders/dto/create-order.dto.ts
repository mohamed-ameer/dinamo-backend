import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
 @ApiProperty({ example: '1234567890' })
 user: string;
 @ApiProperty({ example: [{ productId: '1234567890', quantity: 2 }] })
 products: string[];
 @ApiProperty({ example: 100.00 })
 totalAmount: number;
 @ApiProperty({ example: '1/1/2024' })
 orderDate: Date;
 @ApiProperty({ example: 'paid' })
 status: string;
}
