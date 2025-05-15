import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { RecursoService } from 'src/repositories/recursos/recurso.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('recurso')
export class RecursoController {

    constructor(
        private recursoService: RecursoService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.recursoService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.recursoService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.recursoService.getObjectById({ body });
    }
}