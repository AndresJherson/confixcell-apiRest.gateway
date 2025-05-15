import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { PantallaModeloCalidadService } from 'src/repositories/recursos/bien/bien-consumo/pantalla/pantalla-modelo-calidad.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('pantallaModeloCalidad')
export class PantallaModeloCalidadController {

    constructor(
        private pantallaModeloCalidadService: PantallaModeloCalidadService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.pantallaModeloCalidadService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.pantallaModeloCalidadService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.pantallaModeloCalidadService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.pantallaModeloCalidadService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.pantallaModeloCalidadService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.pantallaModeloCalidadService.delete({ body });
    }
}