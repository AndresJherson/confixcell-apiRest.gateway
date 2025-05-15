import { ProveedorNatural } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PersonaBaseService } from '../PersonaBaseService';

@Injectable()
export class ProveedorNaturalService extends PersonaBaseService {
    constructor(
        private conectorService: ConectorService
    ) {
        super('proveedorNatural');
    }

    async getCollection() {
        return await this.conectorService.get<ProveedorNatural[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new ProveedorNatural({ ...item })));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, ProveedorNatural>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, new ProveedorNatural({ ...item })])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<ProveedorNatural>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new ProveedorNatural({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<ProveedorNatural>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new ProveedorNatural({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<ProveedorNatural>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new ProveedorNatural({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}