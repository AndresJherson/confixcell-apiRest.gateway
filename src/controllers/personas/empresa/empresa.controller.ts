import { Body, Controller, Get, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { EmpresaService } from 'src/repositories/personas/empresa/empresa.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('empresa')
export class EmpresaController {
    constructor(
        private empresaService: EmpresaService
    ) {}

    @Get('getObject')
    async getObject() {
        return await this.empresaService.getObject();
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.empresaService.update({ body });
    }
}
