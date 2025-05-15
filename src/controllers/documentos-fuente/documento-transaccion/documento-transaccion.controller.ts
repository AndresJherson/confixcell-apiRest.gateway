import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { DocumentoTransaccionService } from 'src/repositories/documentos-fuente/documento-transaccion/documento-transaccion.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('documentoTransaccion')
export class DocumentoTransaccionController {

    constructor(
        private documentoTransaccionService: DocumentoTransaccionService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.documentoTransaccionService.getCollection({ complete: true });
    }

    @ApiBody({})
    @Post('getCollectionByUsuarioId')
    async getCollectionByUsuarioId(
        @Body() body: any
    )
    {
        return await this.documentoTransaccionService.getCollectionByUsuarioId({ body, complete: true });
    }

    @ApiBody({})
    @Post('getCollectionByClienteId')
    async getCollectionByClienteId(
        @Body() body: any
    )
    {
        return await this.documentoTransaccionService.getCollectionByClienteId({ body, complete: true });
    }

    @ApiBody({})
    @Post('getCollectionByProveedorId')
    async getCollectionByProveedorId(
        @Body() body: any
    )
    {
        return await this.documentoTransaccionService.getCollectionByProveedorId({ body, complete: true });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.documentoTransaccionService.getObjectById({ body, complete: true });
    }
}