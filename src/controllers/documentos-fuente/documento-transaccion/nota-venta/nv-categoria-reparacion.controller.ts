import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { NvCategoriaReparacionService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-venta/nv-categoria-reparacion.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('nvCategoriaReparacion')
export class NvCategoriaReparacionController {

    constructor(
        private nvCategoriaReparacionService: NvCategoriaReparacionService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.nvCategoriaReparacionService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.nvCategoriaReparacionService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    )
    {
        return await this.nvCategoriaReparacionService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    )
    {
        return await this.nvCategoriaReparacionService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.nvCategoriaReparacionService.delete({ body });
    }
}