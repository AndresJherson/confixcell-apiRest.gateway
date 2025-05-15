import { ClienteJuridico } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PersonaBaseService } from '../PersonaBaseService';

@Injectable()
export class ClienteJuridicoService extends PersonaBaseService {
    constructor(
        private conectorService: ConectorService
    ) {
        super('clienteJuridico');
    }

    async getCollection() {
        return await this.conectorService.get<ClienteJuridico[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new ClienteJuridico({ ...item })));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, ClienteJuridico>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, new ClienteJuridico({ ...item })])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<ClienteJuridico>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new ClienteJuridico({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<ClienteJuridico>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new ClienteJuridico({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<ClienteJuridico>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new ClienteJuridico({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}