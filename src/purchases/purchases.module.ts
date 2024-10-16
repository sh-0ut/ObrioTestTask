import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { Purchase } from './purchase.entity';
import { UsersModule } from '../users/users.module';
import { OffersModule } from '../offers/offers.module';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase]),
    UsersModule,
    OffersModule,
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  providers: [PurchasesService],
  controllers: [PurchasesController],
})
export class PurchasesModule {}
