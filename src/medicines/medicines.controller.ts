import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { RequestIdService } from '../shared/request-id.service';

@Controller('medicines')
export class MedicinesController {
    constructor(
        private readonly medicinesService: MedicinesService,
        private readonly requestIdService: RequestIdService
    ) {}

    @Header('X-API-Version', '1.0')
    @Header('X-Service-Status', 'operational')
    @Get()
    findAll(
        @Query('search') search?: string,
        @Query('limit') limit?: string,
    ) {
        console.log("requestId = " + this.requestIdService.requestId)
        return this.medicinesService.findAll(search, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string,) {
        console.log("requestId = " + this.requestIdService.requestId)
        return this.medicinesService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createMedicineDto: CreateMedicineDto) {
        console.log("requestId = " + this.requestIdService.requestId)
        return this.medicinesService.create(createMedicineDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMedicineDto: UpdateMedicineDto,) {
        console.log("requestId = " + this.requestIdService.requestId)
        return this.medicinesService.update(id, updateMedicineDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string) {
        console.log("requestId = " + this.requestIdService.requestId)
        return this.medicinesService.delete(id);
    }
}
