import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { BienConsumoService } from 'src/repositories/recursos/bien/bien-consumo/bien-consumo.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('bienConsumo')
export class BienConsumoController {

    constructor(
        private bienConsumoService: BienConsumoService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.bienConsumoService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.bienConsumoService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.bienConsumoService.getObjectById({ body });
    }
}