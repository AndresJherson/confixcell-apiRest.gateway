import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { NotaVentaService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-venta/nota-venta.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('notaVenta')
export class NotaVentaController {

    constructor(
        private notaVentaService: NotaVentaService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.notaVentaService.getCollection({ complete: true });
    }

    @ApiBody({})
    @Post('getCollectionByUsuarioId')
    async getCollectionByUsuarioId(
        @Body() body: any
    )
    {
        return await this.notaVentaService.getCollectionByUsuarioId({ body, complete: true });
    }

    @ApiBody({})
    @Post('getCollectionByClienteId')
    async getCollectionByClienteId(
        @Body() body: any
    )
    {
        return await this.notaVentaService.getCollectionByClienteId({ body, complete: true });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.notaVentaService.getObjectById({ body, complete: true });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    )
    {
        return await this.notaVentaService.create({ body, complete: true });
    }

    @ApiBody({})
    @Post('createAndIssue')
    async createAndIssue(
        @Body() body: any
    )
    {
        return await this.notaVentaService.createAndIssue({ body, complete: true });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    )
    {
        return await this.notaVentaService.update({ body, complete: true });
    }

    @ApiBody({})
    @Put('updateAndIssue')
    async updateAndIssue(
        @Body() body: any
    )
    {
        return await this.notaVentaService.updateAndIssue({ body, complete: true });
    }

    @ApiBody({})
    @Put('updateVoid')
    async updateVoid(
        @Body() body: any
    )
    {
        return await this.notaVentaService.updateVoid({ body, complete: true });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.notaVentaService.delete({ body });
    }
}