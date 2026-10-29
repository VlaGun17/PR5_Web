import { Module } from '@nestjs/common';
import { SlugService } from './slug/slug.service';
import { FEE_CALCULATOR, FeeCalculatorProvider, STORE_CONFIG, StoreConfigProvider } from './config/app-config.provider';
import { RequestIdService } from './request-id.service';

@Module({
  providers: [SlugService, StoreConfigProvider, FeeCalculatorProvider, RequestIdService],
  exports: [SlugService, STORE_CONFIG, FEE_CALCULATOR, RequestIdService],
})
export class SharedModule {}
