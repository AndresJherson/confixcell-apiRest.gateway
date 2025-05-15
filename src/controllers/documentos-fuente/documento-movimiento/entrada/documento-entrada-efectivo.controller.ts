import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { DocumentoEntradaEfectivoService } from 'src/repositories/documentos-fuente/documento-movimiento/entrada/documento-entrada-efectivo.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('documentoEntradaEfectivo')
export class DocumentoEntradaEfectivoController {

    constructor(
        private documentoEntradaEfectivoService: DocumentoEntradaEfectivoService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.documentoEntradaEfectivoService.getCollection({ complete: true });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.documentoEntradaEfectivoService.getObjectById({ 
            body, 
            complete: true 
        });
    }

    @ApiBody({})
    @Post('createAndIssue')
    async createAndIssue(
        @Body() body: any
    )
    {
        return await this.documentoEntradaEfectivoService.createAndIssue({ 
            body, 
            complete: true 
        });
    }

    @ApiBody({})
    @Put('updateVoid')
    async updateVoid(
        @Body() body: any
    )
    {
        return await this.documentoEntradaEfectivoService.updateVoid({ 
            body, 
            complete: true 
        });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.documentoEntradaEfectivoService.delete({ body });
    }
}