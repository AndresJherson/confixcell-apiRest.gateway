import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { BienCapitalService } from 'src/repositories/recursos/bien/bien-capital/bien-capital.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('bienCapital')
export class BienCapitalController {

    constructor(
        private bienCapitalService: BienCapitalService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.bienCapitalService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.bienCapitalService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.bienCapitalService.getObjectById({ body });
    }

    @ApiBody({})
    @Post('create')
    async create(
        @Body() body: any
    ) {
        return await this.bienCapitalService.create({ body });
    }

    @ApiBody({})
    @Put('update')
    async update(
        @Body() body: any
    ) {
        return await this.bienCapitalService.update({ body });
    }

    @ApiBody({})
    @Delete('delete')
    async delete(
        @Body() body: any
    ) {
        return await this.bienCapitalService.delete({ body });
    }
}