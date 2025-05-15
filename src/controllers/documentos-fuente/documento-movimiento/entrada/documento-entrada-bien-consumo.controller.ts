import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { DocumentoEntradaBienConsumoService } from 'src/repositories/documentos-fuente/documento-movimiento/entrada/documento-entrada-bien-consumo.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('documentoEntradaBienConsumo')
export class DocumentoEntradaBienConsumoController {

    constructor(
        private documentoEntradaBienConsumoService: DocumentoEntradaBienConsumoService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.documentoEntradaBienConsumoService.getCollection({ complete: true });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.documentoEntradaBienConsumoService.getObjectById({ body, complete: true });
    }

    @ApiBody({})
    @Post('createAndIssue')
    async createAndIssue(
        @Body() body: any
    )
    {
        return await this.documentoEntradaBienConsumoService.createAndIssue({ body, complete: true });
    }

    @ApiBody({})
    @Put('updateVoid')
    async updateVoid(
        @Body() body: any
    )
    {
        return await this.documentoEntradaBienConsumoService.updateVoid({ body, complete: true });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.documentoEntradaBienConsumoService.delete({ body });
    }
}