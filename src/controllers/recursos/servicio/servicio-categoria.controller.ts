import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { ServicioCategoriaService } from 'src/repositories/recursos/servicio/servicio-categoria.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('servicioCategoria')
export class ServicioCategoriaController {

    constructor(
        private servicioCategoriaService: ServicioCategoriaService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.servicioCategoriaService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.servicioCategoriaService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.servicioCategoriaService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.servicioCategoriaService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.servicioCategoriaService.delete({ body });
    }
}