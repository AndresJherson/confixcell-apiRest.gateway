import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { PersonaService } from 'src/repositories/personas/persona.service';

@ApiBearerAuth()
@UseInterceptors(AuthInterceptor)
@Controller('persona')
export class PersonaController {
    constructor(
        private personaService: PersonaService
    ) {}

    @Get('getCollection')
    async getCollection() {
        return await this.personaService.getCollection();
    }

    @ApiBody({})
    @Post('getRecordByUuids')
    async getRecordByUuids(
        @Body() body: any
    ) {
        return await this.personaService.getRecordByUuids({ body });
    }

    @ApiBody({})
    @Post('getObjectById')
    async getObjectById(
        @Body() body: any
    ) {
        return await this.personaService.getObjectById({ body });
    }
}