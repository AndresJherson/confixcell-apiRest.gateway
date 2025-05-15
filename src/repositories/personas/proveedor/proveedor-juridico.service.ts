import { ProveedorJuridico } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PersonaBaseService } from '../PersonaBaseService';

@Injectable()
export class ProveedorJuridicoService extends PersonaBaseService {
    constructor(
        private conectorService: ConectorService
    ) {
        super('proveedorJuridico');
    }

    async getCollection() {
        return await this.conectorService.get<ProveedorJuridico[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new ProveedorJuridico({ ...item })));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, ProveedorJuridico>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, new ProveedorJuridico({ ...item })])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<ProveedorJuridico>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new ProveedorJuridico({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<ProveedorJuridico>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new ProveedorJuridico({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<ProveedorJuridico>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new ProveedorJuridico({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}