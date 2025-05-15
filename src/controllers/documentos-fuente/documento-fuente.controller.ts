import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { DocumentoFuenteService } from 'src/repositories/documentos-fuente/documento-fuente.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('documentoFuente')
export class DocumentoFuenteController {

    constructor(
        private documentoFuenteService: DocumentoFuenteService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.documentoFuenteService.getCollection({ complete: true });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.documentoFuenteService.getObjectById({ body, complete: true });
    }
}