import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { ServicioService } from 'src/repositories/recursos/servicio/servicio.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('servicio')
export class ServicioController {

    constructor(
        private servicioService: ServicioService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.servicioService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.servicioService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.servicioService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.servicioService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.servicioService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.servicioService.delete({ body });
    }
}