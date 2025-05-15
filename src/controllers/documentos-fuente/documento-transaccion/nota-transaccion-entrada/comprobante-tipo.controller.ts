import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { ComprobanteTipoService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-transaccion-entrada/comprobante-tipo.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('comprobanteTipo')
export class ComprobanteTipoController {

    constructor(
        private comprobanteTipoService: ComprobanteTipoService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.comprobanteTipoService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.comprobanteTipoService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    )
    {
        return await this.comprobanteTipoService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    )
    {
        return await this.comprobanteTipoService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.comprobanteTipoService.delete({ body });
    }
}