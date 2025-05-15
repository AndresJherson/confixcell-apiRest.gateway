import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { ProveedorService } from 'src/repositories/personas/proveedor/proveedor.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('proveedor')
export class ProveedorController {
    constructor(
        private proveedorService: ProveedorService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.proveedorService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.proveedorService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.proveedorService.getObjectById({ body });
    }
}