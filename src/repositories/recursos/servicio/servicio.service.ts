import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { RecursoBaseService } from '../RecursoBaseService';
import { Servicio } from '@confixcell/modelos';

@Injectable()
export class ServicioService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('servicio');
    }

    async getCollection() {
        return await this.conectorService.get<Servicio[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new Servicio({ ...item })));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, Servicio>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, new Servicio({ ...item })])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<Servicio>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new Servicio({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<Servicio>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new Servicio({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<Servicio>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new Servicio({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}