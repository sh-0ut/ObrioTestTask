import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Purchase } from './purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UsersService } from '../users/users.service';
import { OffersService } from '../offers/offers.service';

import { HttpService } from '@nestjs/axios';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PurchasesService {
  private readonly logger = new Logger(PurchasesService.name);

  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
    private usersService: UsersService,
    private offersService: OffersService,
    private httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const user = await this.usersService.findById(createPurchaseDto.userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${createPurchaseDto.userId} not found`);
    }

    const offer = await this.offersService.findById(createPurchaseDto.offerId);
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${createPurchaseDto.offerId} not found`);
    }

    const purchase = this.purchasesRepository.create({
      userId: user.id,
      offerId: offer.id,
    });

    const savedPurchase = await this.purchasesRepository.save(purchase);

    await this.sendAnalyticsEvent(savedPurchase);
    this.scheduleAstrologicalReport(savedPurchase);

    return savedPurchase;
  }

  private async sendAnalyticsEvent(purchase: Purchase): Promise<void> {
    try {
      await lastValueFrom(
        this.httpService.post('http://analytics-service/events', {
          purchaseId: purchase.id,
          userId: purchase.userId,
          offerId: purchase.offerId,
        }),
      );
      this.logger.log(`Analytics event sent for purchase ID ${purchase.id}`);
    } catch (error) {
      this.logger.error(`Failed to send analytics event: ${error.message}`);
      throw new InternalServerErrorException('Failed to send analytics event');
    }
  }

  private scheduleAstrologicalReport(purchase: Purchase): void {
    const jobName = `astrologicalReport-${purchase.id}`;
    const date = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const job = new CronJob(date, async () => {
      try {
        await lastValueFrom(
          this.httpService.post('http://astrological-service/report', {
            userId: purchase.userId,
          }),
        );
        this.logger.log(`Astrological report sent for user ID ${purchase.userId}`);
      } catch (error) {
        this.logger.error(`Failed to send astrological report: ${error.message}`);
      }

      this.schedulerRegistry.deleteCronJob(jobName);
    });

    this.schedulerRegistry.addCronJob(jobName, job);
    job.start();
  }
}
