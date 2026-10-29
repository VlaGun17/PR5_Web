import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { SlugService } from '../shared/slug/slug.service';

export interface Medicine {
    id: string;
    title: string;
    price: number;
    dosageMg: number;
    isPrescriptionRequired: boolean;
    expirationDate: Date;
    slug: string;
}

@Injectable()
export class MedicinesService implements OnModuleInit {
    private readonly logger = new Logger(MedicinesService.name);

    private items: Medicine[] = [
        { id: '1', title: 'Medicine 1', price: 10, dosageMg: 500, isPrescriptionRequired: false, expirationDate: new Date('2025-01-01'), slug: 'medicine-1'},
        { id: '2', title: 'Medicine 2', price: 20, dosageMg: 250, isPrescriptionRequired: true, expirationDate: new Date('2024-06-01'), slug: 'medicine-2' },
        { id: '3', title: 'Medicine 3', price: 15, dosageMg: 100, isPrescriptionRequired: false, expirationDate: new Date('2026-12-31'), slug: 'medicine-3'},
    ];

    constructor(private readonly slugService: SlugService) {}

    async findAll(search?: string, limit?: string) {
        let filteredItems = this.items;

        if (search) {
            filteredItems = filteredItems.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
        }

        if (limit) {
            filteredItems = filteredItems.slice(0, Number(limit));
        }

        return filteredItems;
    }

    async findOne(id: string) {
        const result = this.items.find((item) => item.id === id);
        if( result) {
            return result;
        } else {
            throw new NotFoundException(`Сутність з ID ${id} не знайдена`);
        }
    }

    async create(dto: CreateMedicineDto) {
        const newItem = {
            id: (this.items.length + 1).toString(),
            title: dto['title'],
            price: dto['price'],
            dosageMg: dto['dosageMg'],
            isPrescriptionRequired: dto['isPrescriptionRequired'],
            expirationDate: dto['expirationDate'],
            slug: this.slugService.generateSlug(dto['title']),
        };
        this.items.push(newItem);
        return newItem;
    }

    async update(id: string, dto: UpdateMedicineDto) {
        const index = this.items.findIndex((item) => item.id === id);
        const item = this.items[index];
        if (!item) throw new NotFoundException(`Сутність з ID ${id} не знайдена`);

        Object.assign(item, dto);
        return item;
    }
    
    async delete(id: string) {
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1) throw new NotFoundException(`Сутність з ID ${id} не знайдена`);
        this.items.splice(index, 1);
    }

    onModuleInit() {
        this.logger.log('[MedicinesService] Ініціалізація модуля завершена. Завантажено початкові тестові дані.');

        this.create({ title: 'Medicine 3', price: 60, dosageMg: 500, isPrescriptionRequired: false, expirationDate: new Date('2025-01-01')});
        this.create({ title: 'Medicine 4', price: 80, dosageMg: 250, isPrescriptionRequired: true, expirationDate: new Date('2024-06-01')});
  }
}
