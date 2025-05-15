import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { ClienteService } from 'src/repositories/personas/cliente/cliente.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('cliente')
export class ClienteController {
    constructor(
        private clienteService: ClienteService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.clienteService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.clienteService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.clienteService.getObjectById({ body });
    }
}