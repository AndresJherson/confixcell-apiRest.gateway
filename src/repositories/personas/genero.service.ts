import { Genero } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PersonaBaseService } from './PersonaBaseService';

@Injectable()
export class GeneroService extends PersonaBaseService {
    constructor(
        private conectorService: ConectorService
    ) {
        super('genero');
    }

    async getCollection() {
        return await this.conectorService.get<Genero[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new Genero({ ...item })));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<Genero>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new Genero({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<Genero>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new Genero({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<Genero>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new Genero({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}