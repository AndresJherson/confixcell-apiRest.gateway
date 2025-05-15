import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { PantallaMarcaService } from 'src/repositories/recursos/bien/bien-consumo/pantalla/pantalla-marca.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('pantallaMarca')
export class PantallaMarcaController {

    constructor(
        private pantallaMarcaService: PantallaMarcaService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.pantallaMarcaService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.pantallaMarcaService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.pantallaMarcaService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.pantallaMarcaService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.pantallaMarcaService.delete({ body });
    }
}