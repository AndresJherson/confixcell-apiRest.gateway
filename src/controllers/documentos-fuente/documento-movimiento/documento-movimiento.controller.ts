import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { DocumentoMovimientoService } from 'src/repositories/documentos-fuente/documento-movimiento/documento-movimiento.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('documentoMovimiento')
export class DocumentoMovimientoController {

    constructor(
        private documentoMovimientoService: DocumentoMovimientoService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.documentoMovimientoService.getCollection({ complete: true });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.documentoMovimientoService.getObjectById({ body, complete: true });
    }
}