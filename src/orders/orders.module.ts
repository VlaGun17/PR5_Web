import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MedicinesModule } from '../medicines/medicines.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [MedicinesModule, SharedModule],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
