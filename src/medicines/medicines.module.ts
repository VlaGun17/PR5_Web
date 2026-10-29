import { Module } from '@nestjs/common';
import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [SharedModule],
    controllers: [MedicinesController],
    providers: [MedicinesService],
    exports: [MedicinesService],
})
export class MedicinesModule {}
