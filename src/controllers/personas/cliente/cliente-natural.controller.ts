import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { ClienteNaturalService } from 'src/repositories/personas/cliente/cliente-natural.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('clienteNatural')
export class ClienteNaturalController {
    constructor(
        private clienteNaturalService: ClienteNaturalService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.clienteNaturalService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.clienteNaturalService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.clienteNaturalService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.clienteNaturalService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.clienteNaturalService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.clienteNaturalService.delete({ body });
    }
}