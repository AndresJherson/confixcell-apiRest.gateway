import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { DocumentoSalidaBienConsumoService } from 'src/repositories/documentos-fuente/documento-movimiento/salida/documento-salida-bien-consumo.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('documentoSalidaBienConsumo')
export class DocumentoSalidaBienConsumoController {

    constructor(
        private documentoSalidaBienConsumoService: DocumentoSalidaBienConsumoService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.documentoSalidaBienConsumoService.getCollection({ complete: true });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.documentoSalidaBienConsumoService.getObjectById({ body, complete: true });
    }

    @ApiBody({})
    @Post('createAndIssue')
    async createAndIssue(
        @Body() body: any
    )
    {
        return await this.documentoSalidaBienConsumoService.createAndIssue({ body, complete: true });
    }

    @ApiBody({})
    @Put('updateVoid')
    async updateVoid(
        @Body() body: any
    )
    {
        return await this.documentoSalidaBienConsumoService.updateVoid({ body, complete: true });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.documentoSalidaBienConsumoService.delete({ body });
    }
}