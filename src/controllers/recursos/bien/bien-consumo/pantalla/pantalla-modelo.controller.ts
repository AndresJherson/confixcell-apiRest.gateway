import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { PantallaModeloService } from 'src/repositories/recursos/bien/bien-consumo/pantalla/pantalla-modelo.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('pantallaModelo')
export class PantallaModeloController {

    constructor(
        private pantallaModeloService: PantallaModeloService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.pantallaModeloService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.pantallaModeloService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.pantallaModeloService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.pantallaModeloService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.pantallaModeloService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.pantallaModeloService.delete({ body });
    }
}