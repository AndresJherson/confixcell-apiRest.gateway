import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { Almacen } from '@confixcell/modelos';
import { RecursoBaseService } from '../../RecursoBaseService';

@Injectable()
export class AlmacenService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('almacen');
    }

    async getCollection() {
        return await this.conectorService.get<Almacen[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new Almacen({ ...item })));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, Almacen>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, new Almacen({ ...item })])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<Almacen>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new Almacen({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<Almacen>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new Almacen({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<Almacen>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new Almacen({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}
