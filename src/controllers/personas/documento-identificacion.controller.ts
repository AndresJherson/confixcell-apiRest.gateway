import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { DocumentoIdentificacionService } from 'src/repositories/personas/documento-identificacion.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('documentoIdentificacion')
export class DocumentoIdentificacionController {
    constructor(
        private documentoIdentificacionService: DocumentoIdentificacionService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.documentoIdentificacionService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.documentoIdentificacionService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.documentoIdentificacionService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.documentoIdentificacionService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.documentoIdentificacionService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.documentoIdentificacionService.delete({ body });
    }
}