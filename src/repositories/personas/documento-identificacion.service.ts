import { DocumentoIdentificacion } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PersonaBaseService } from './PersonaBaseService';

@Injectable()
export class DocumentoIdentificacionService extends PersonaBaseService {
    constructor(
        private conectorService: ConectorService
    ) {
        super('documentoIdentificacion');
    }

    async getCollection() {
        return await this.conectorService.get<DocumentoIdentificacion[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new DocumentoIdentificacion({ ...item })));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, DocumentoIdentificacion>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, new DocumentoIdentificacion({ ...item })])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<DocumentoIdentificacion>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new DocumentoIdentificacion({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<DocumentoIdentificacion>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new DocumentoIdentificacion({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<DocumentoIdentificacion>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new DocumentoIdentificacion({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}