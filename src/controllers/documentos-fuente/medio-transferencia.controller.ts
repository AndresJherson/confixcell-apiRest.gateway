import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { MedioTransferenciaService } from 'src/repositories/documentos-fuente/medio-transferencia.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('medioTransferencia')
export class MedioTransferenciaController {

    constructor(
        private medioTransferenciaService: MedioTransferenciaService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.medioTransferenciaService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.medioTransferenciaService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    )
    {
        return await this.medioTransferenciaService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    )
    {
        return await this.medioTransferenciaService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.medioTransferenciaService.delete({ body });
    }
}