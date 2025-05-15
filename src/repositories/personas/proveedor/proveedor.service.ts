import { Proveedor } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PersonaBaseService } from '../PersonaBaseService';

@Injectable()
export class ProveedorService extends PersonaBaseService {
    constructor(
        private conectorService: ConectorService
    ) {
        super('proveedor');
    }

    async getCollection() {
        return await this.conectorService.get<Proveedor[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => Proveedor.initialize([ item ])[0] ));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, Proveedor>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, Proveedor.initialize([ item ])[0] ])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<Proveedor>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => Proveedor.initialize([ item ])[0] );
    }
}