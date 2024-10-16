import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OffersService } from './offers.service';
import { Offer } from './offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  providers: [OffersService],
  exports: [OffersService],
})
export class OffersModule {}
