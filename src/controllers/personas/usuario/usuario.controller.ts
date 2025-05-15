import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { UsuarioService } from 'src/repositories/personas/usuario/usuario.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('usuario')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.usuarioService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.usuarioService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.usuarioService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('getObjectByCredentials')
    async getObjectByCredentials(
        @Body() body: any
    ) {
        return await this.usuarioService.getObjectByCredentials({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.usuarioService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.usuarioService.update({ body });
    }

    @ApiBody({})
    @Put('selfUpdate')
    async selfUpdate(
        @Body() body: any
    ) {
        return await this.usuarioService.selfUpdate({ body });
    }

    @ApiBody({})
    @Put('updateContrasena')
    async updateContrasena(
        @Body() body: any
    ) {
        return await this.usuarioService.updateContrasena({ body });
    }

    @ApiBody({})
    @Put('selfUpdateContrasena')
    async selfUpdateContrasena(
        @Body() body: any
    ) {
        return await this.usuarioService.selfUpdateContrasena({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.usuarioService.delete({ body });
    }
}