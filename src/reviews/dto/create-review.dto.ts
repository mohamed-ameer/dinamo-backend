import { ApiProperty } from '@nestjs/swagger';
export class CreateReviewDto {
    @ApiProperty({ example: 'User id 1' })
    user: string;
    @ApiProperty({ example: 'Product id 1' })
    product: string;
    @ApiProperty({ example: 5 })
    rating: number;
    @ApiProperty({ example: 'Great product!' })
    comment: string;
}
