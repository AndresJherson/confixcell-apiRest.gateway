import { Cliente } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PersonaBaseService } from '../PersonaBaseService';

@Injectable()
export class ClienteService extends PersonaBaseService {
    constructor(
        private conectorService: ConectorService
    ) {
        super('cliente');
    }

    async getCollection() {
        return await this.conectorService.get<Cliente[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => Cliente.initialize([ item ])[0] ));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, Cliente>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, Cliente.initialize([ item ])[0] ])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<Cliente>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => Cliente.initialize([ item ])[0] );
    }
}