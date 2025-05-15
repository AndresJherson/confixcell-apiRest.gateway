import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { ProductoCategoriaService } from 'src/repositories/recursos/bien/bien-consumo/producto/producto-categoria.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('productoCategoria')
export class ProductoCategoriaController {

    constructor(
        private productoCategoriaService: ProductoCategoriaService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.productoCategoriaService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.productoCategoriaService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.productoCategoriaService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.productoCategoriaService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.productoCategoriaService.delete({ body });
    }
}