import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { GeneroService } from 'src/repositories/personas/genero.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('genero')
export class GeneroController {
    constructor(
        private generoService: GeneroService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.generoService.getCollection();
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.generoService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.generoService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.generoService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.generoService.delete({ body });
    }
}