import { ApiProperty } from '@nestjs/swagger';
export class CreateVendorDto {
    @ApiProperty({ example: 'Vendor 1' })
    name: string;
    @ApiProperty({ example: 'vendor1@example.com' })
    email: string;
    @ApiProperty({ example: 'product id 1' })
    products: string[];
}
