import { Controller, Post, Body } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Purchase } from './purchase.entity';

@ApiTags('purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new purchase' })
  @ApiResponse({ status: 201, description: 'The purchase has been successfully created.', type: Purchase })
  async create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto);
  }
}
