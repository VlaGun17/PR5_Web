import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Controller('medicines')
export class MedicinesController {
    constructor(private readonly medicinesService: MedicinesService) {}

    @Header('X-API-Version', '1.0')
    @Header('X-Service-Status', 'operational')
    @Get()
    findAll(
        @Query('search') search?: string,
        @Query('limit') limit?: string,
    ) {
        return this.medicinesService.findAll(search, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string,) {
        return this.medicinesService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createMedicineDto: CreateMedicineDto) {
        return this.medicinesService.create(createMedicineDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMedicineDto: UpdateMedicineDto,) {
        return this.medicinesService.update(id, updateMedicineDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string) {
        return this.medicinesService.delete(id);
    }
}
