import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  offerId: number;
}
