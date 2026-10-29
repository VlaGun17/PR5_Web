import { Inject, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { MedicinesService } from '../medicines/medicines.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FEE_CALCULATOR} from '../shared/config/app-config.provider';
import type { FeeCalculator } from '../shared/config/app-config.provider';

export interface OrderEntity {
  id: string;
  productId: string;
  productTitle: string;
  quantity: number;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  createdAt: Date;
}

@Injectable()
export class OrdersService implements OnModuleInit{
    private readonly logger = new Logger(OrdersService.name)

    private orders: OrderEntity[] = [];

    constructor(
        private readonly medicinesService: MedicinesService,
        @Inject(FEE_CALCULATOR) private readonly feeCalculator: FeeCalculator,
    ) {}

    onModuleInit() {
        this.logger.log('[OrdersService] Сервіс замовлень успішно підключено до білінгу та каталогу.');
    }

    async createOrder(dto: CreateOrderDto) {
        const product = this.medicinesService.findOne(dto.productId);

        if(!product) {
            throw new NotFoundException(`Ліки з ID "${dto.productId}" не знайдено`);
        }

        const subtotal = (await product).price * dto.quantity;
        const taxAmount = this.feeCalculator.calculateTax(subtotal);
        const totalAmount = subtotal + taxAmount;

        const newOrder: OrderEntity = {
        id: `ord-${Date.now()}`,
        productId: (await product).id,
        productTitle: (await product).title,
        quantity: dto.quantity,
        subtotal,
        taxAmount,
        totalAmount,
        createdAt: new Date(),
        };

        this.orders.push(newOrder);
        return newOrder;
    }

    async findAll() {
        return this.orders;
    }
}
