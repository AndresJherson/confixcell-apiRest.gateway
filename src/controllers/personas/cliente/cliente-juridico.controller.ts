import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { ClienteJuridicoService } from 'src/repositories/personas/cliente/cliente-juridico.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('clienteJuridico')
export class ClienteJuridicoController {
    constructor(
        private clienteJuridicoService: ClienteJuridicoService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.clienteJuridicoService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.clienteJuridicoService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.clienteJuridicoService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.clienteJuridicoService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.clienteJuridicoService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.clienteJuridicoService.delete({ body });
    }
}