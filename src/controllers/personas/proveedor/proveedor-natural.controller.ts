import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { ProveedorNaturalService } from 'src/repositories/personas/proveedor/proveedor-natural.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('proveedorNatural')
export class ProveedorNaturalController {
    constructor(
        private proveedorNaturalService: ProveedorNaturalService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.proveedorNaturalService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.proveedorNaturalService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.proveedorNaturalService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.proveedorNaturalService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.proveedorNaturalService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.proveedorNaturalService.delete({ body });
    }
}