import { Body, Controller, Delete, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { NotaService } from 'src/repositories/documentos-fuente/nota/nota.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('nota')
export class NotaController {

    constructor(
        private notaService: NotaService
    )
    {}

    @ApiBody({})
    @Post('getCollectionByDocumentoId')
    async getCollectionByDocumentoId(
        @Body() body: any
    )
    {
        return await this.notaService.getCollectionByDocumentoId({ body, complete: true });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    )
    {
        return await this.notaService.getObjectById({ body, complete: true  });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    )
    {
        return await this.notaService.create({ body, complete: true });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    )
    {
        return await this.notaService.delete({ body });
    }
}