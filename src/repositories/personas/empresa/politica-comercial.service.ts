import { Injectable } from '@nestjs/common';
import { PersonaBaseService } from '../PersonaBaseService';
import { ConectorService } from 'src/services/conector.service';
import { PoliticaComercial } from '@confixcell/modelos';

@Injectable()
export class PoliticaComercialService extends PersonaBaseService {
    constructor(
        private conectorService: ConectorService
    ) {
        super('politicaComercial');
    }

    async getCollection() {
        return await this.conectorService.get<PoliticaComercial[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new PoliticaComercial({ ...item })));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<PoliticaComercial>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new PoliticaComercial({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<PoliticaComercial>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new PoliticaComercial({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<PoliticaComercial>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new PoliticaComercial({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}