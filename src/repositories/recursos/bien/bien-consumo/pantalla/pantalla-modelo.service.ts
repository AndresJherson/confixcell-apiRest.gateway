import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PantallaModelo } from '@confixcell/modelos';
import { RecursoBaseService } from 'src/repositories/recursos/RecursoBaseService';

@Injectable()
export class PantallaModeloService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('pantallaModelo');
    }

    async getCollection() {
        return await this.conectorService.get<PantallaModelo[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new PantallaModelo({ ...item })));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, PantallaModelo>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, new PantallaModelo({ ...item })])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<PantallaModelo>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new PantallaModelo({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<PantallaModelo>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new PantallaModelo({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<PantallaModelo>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new PantallaModelo({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}