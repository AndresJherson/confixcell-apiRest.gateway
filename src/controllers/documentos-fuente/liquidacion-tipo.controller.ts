import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { LiquidacionTipoService } from 'src/repositories/documentos-fuente/liquidacion-tipo.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('liquidacionTipo')
export class LiquidacionTipoController {

    constructor(
        private liquidacionTipoService: LiquidacionTipoService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.liquidacionTipoService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.liquidacionTipoService.getObjectById({ body });
    }
}