import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { DocumentoSalidaEfectivoService } from 'src/repositories/documentos-fuente/documento-movimiento/salida/documento-salida-efectivo.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('documentoSalidaEfectivo')
export class DocumentoSalidaEfectivoController {

    constructor(
        private documentoSalidaEfectivoService: DocumentoSalidaEfectivoService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.documentoSalidaEfectivoService.getCollection({ complete: true });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.documentoSalidaEfectivoService.getObjectById({ body, complete: true });
    }

    @ApiBody({})
    @Post('createAndIssue')
    async createAndIssue(
        @Body() body: any
    )
    {
        return await this.documentoSalidaEfectivoService.createAndIssue({ body, complete: true });
    }

    @ApiBody({})
    @Put('updateVoid')
    async updateVoid(
        @Body() body: any
    )
    {
        return await this.documentoSalidaEfectivoService.updateVoid({ body, complete: true });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.documentoSalidaEfectivoService.delete({ body });
    }
}