import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { CalidadService } from 'src/repositories/recursos/bien/bien-consumo/pantalla/calidad.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('calidad')
export class CalidadController {

    constructor(
        private calidadService: CalidadService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.calidadService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.calidadService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.calidadService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.calidadService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.calidadService.delete({ body });
    }
}