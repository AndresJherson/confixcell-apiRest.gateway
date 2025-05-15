import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { NvEstadoService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-venta/nv-estado.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('nvEstado')
export class NvEstadoController {

    constructor(
        private nvEstadoService: NvEstadoService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.nvEstadoService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.nvEstadoService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    )
    {
        return await this.nvEstadoService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    )
    {
        return await this.nvEstadoService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.nvEstadoService.delete({ body });
    }
}