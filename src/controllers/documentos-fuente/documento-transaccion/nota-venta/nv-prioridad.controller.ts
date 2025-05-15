import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { NvPrioridadService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-venta/nv-prioridad.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('nvPrioridad')
export class NvPrioridadController {

    constructor(
        private nvPrioridadService: NvPrioridadService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.nvPrioridadService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.nvPrioridadService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    )
    {
        return await this.nvPrioridadService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    )
    {
        return await this.nvPrioridadService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.nvPrioridadService.delete({ body });
    }
}