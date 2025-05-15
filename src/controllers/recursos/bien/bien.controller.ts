import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { BienService } from 'src/repositories/recursos/bien/bien.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('bien')
export class BienController {

    constructor(
        private bienService: BienService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.bienService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.bienService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.bienService.getObjectById({ body });
    }
}