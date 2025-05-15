import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { MagnitudService } from 'src/repositories/recursos/bien/bien-consumo/producto/magnitud.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('magnitud')
export class MagnitudController {

    constructor(
        private magnitudService: MagnitudService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.magnitudService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.magnitudService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.magnitudService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.magnitudService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.magnitudService.delete({ body });
    }
}
