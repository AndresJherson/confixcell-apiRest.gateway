import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { PoliticaComercialService } from 'src/repositories/personas/empresa/politica-comercial.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('politicaComercial')
export class PoliticaComercialController {
    constructor(
        private politicaComercialService: PoliticaComercialService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.politicaComercialService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.politicaComercialService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.politicaComercialService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.politicaComercialService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.politicaComercialService.delete({ body });
    }
}