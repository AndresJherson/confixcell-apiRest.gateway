import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { NotaTransaccionSalidaService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-transaccion-salida/nota-transaccion-salida.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('notaTransaccionSalida')
export class NotaTransaccionSalidaController {

    constructor(
        private notaTransaccionSalidaService: NotaTransaccionSalidaService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.notaTransaccionSalidaService.getCollection({ complete: true });
    }

    @ApiBody({})
    @Post('getCollectionByUsuarioId')
    async getCollectionByUsuarioId(
        @Body() body: any
    )
    {
        return await this.notaTransaccionSalidaService.getCollectionByUsuarioId({ body, complete: true });
    }

    @ApiBody({})
    @Post('getCollectionByClienteId')
    async getCollectionByClienteId(
        @Body() body: any
    )
    {
        return await this.notaTransaccionSalidaService.getCollectionByClienteId({ body, complete: true });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.notaTransaccionSalidaService.getObjectById({ body, complete: true });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    )
    {
        return await this.notaTransaccionSalidaService.create({ body, complete: true });
    }

    @ApiBody({})
    @Post('createAndIssue')
    async createAndIssue(
        @Body() body: any
    )
    {
        return await this.notaTransaccionSalidaService.createAndIssue({ body, complete: true });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    )
    {
        return await this.notaTransaccionSalidaService.update({ body, complete: true });
    }

    @ApiBody({})
    @Put('updateAndIssue')
    async updateAndIssue(
        @Body() body: any
    )
    {
        return await this.notaTransaccionSalidaService.updateAndIssue({ body, complete: true });
    }

    @ApiBody({})
    @Put('updateVoid')
    async updateVoid(
        @Body() body: any
    )
    {
        return await this.notaTransaccionSalidaService.updateVoid({ body, complete: true });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.notaTransaccionSalidaService.delete({ body });
    }
}