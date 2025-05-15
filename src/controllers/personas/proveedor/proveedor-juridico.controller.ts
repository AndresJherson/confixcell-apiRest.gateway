import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { ProveedorJuridicoService } from 'src/repositories/personas/proveedor/proveedor-juridico.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('proveedorJuridico')
export class ProveedorJuridicoController {
    constructor(
        private proveedorJuridicoService: ProveedorJuridicoService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.proveedorJuridicoService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.proveedorJuridicoService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.proveedorJuridicoService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.proveedorJuridicoService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.proveedorJuridicoService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.proveedorJuridicoService.delete({ body });
    }
}