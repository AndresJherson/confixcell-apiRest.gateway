import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { NotaTransaccionEntradaService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-transaccion-entrada/nota-transaccion-entrada.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('notaTransaccionEntrada')
export class NotaTransaccionEntradaController {

    constructor(
        private notaTransaccionEntradaService: NotaTransaccionEntradaService
    )
    {}

    @Get('getCollection')
    async getCollection()
    {
        return await this.notaTransaccionEntradaService.getCollection({ complete: true });
    }

    @ApiBody({})
    @Post('getCollectionByUsuarioId')
    async getCollectionByUsuarioId(
        @Body() body: any
    )
    {
        return await this.notaTransaccionEntradaService.getCollectionByUsuarioId({ body, complete: true });
    }

    @ApiBody({})
    @Post('getCollectionByProveedorId')
    async getCollectionByProveedorId(
        @Body() body: any
    )
    {
        return await this.notaTransaccionEntradaService.getCollectionByProveedorId({ body, complete: true });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.notaTransaccionEntradaService.getObjectById({ body, complete: true });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    )
    {
        return await this.notaTransaccionEntradaService.create({ body, complete: true });
    }

    @ApiBody({})
    @Post('createAndIssue')
    async createAndIssue(
        @Body() body: any
    )
    {
        return await this.notaTransaccionEntradaService.createAndIssue({ body, complete: true });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    )
    {
        return await this.notaTransaccionEntradaService.update({ body, complete: true });
    }

    @ApiBody({})
    @Put('updateAndIssue')
    async updateAndIssue(
        @Body() body: any
    )
    {
        return await this.notaTransaccionEntradaService.updateAndIssue({ body, complete: true });
    }

    @ApiBody({})
    @Put('updateVoid')
    async updateVoid(
        @Body() body: any
    )
    {
        return await this.notaTransaccionEntradaService.updateVoid({ body, complete: true });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.notaTransaccionEntradaService.delete({ body });
    }
}