import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { ProductoMarcaService } from 'src/repositories/recursos/bien/bien-consumo/producto/producto-marca.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('productoMarca')
export class ProductoMarcaController {

    constructor(
        private productoMarcaService: ProductoMarcaService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.productoMarcaService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.productoMarcaService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.productoMarcaService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.productoMarcaService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.productoMarcaService.delete({ body });
    }
}