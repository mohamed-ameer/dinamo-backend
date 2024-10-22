import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
    @ApiProperty({ example: 'Product 1' })
    name: string;
    @ApiProperty({ example: 'Description of Product 1' })
    description: string;
    @ApiProperty({ example: 100.00 })
    price: number;
    @ApiProperty({ example: 10 })
    stock: number;
    @ApiProperty({ example: 'Vendor 1' })
    vendor: string;
}
