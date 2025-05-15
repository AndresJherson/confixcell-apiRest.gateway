import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PantallaModeloCalidad } from '@confixcell/modelos';
import { RecursoBaseService } from 'src/repositories/recursos/RecursoBaseService';

@Injectable()
export class PantallaModeloCalidadService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('pantallaModeloCalidad');
    }

    async getCollection() {
        return await this.conectorService.get<PantallaModeloCalidad[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new PantallaModeloCalidad({ ...item })));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, PantallaModeloCalidad>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, new PantallaModeloCalidad({ ...item })])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<PantallaModeloCalidad>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new PantallaModeloCalidad({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<PantallaModeloCalidad>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new PantallaModeloCalidad({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<PantallaModeloCalidad>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new PantallaModeloCalidad({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}