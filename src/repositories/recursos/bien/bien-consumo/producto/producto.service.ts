import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { Producto } from '@confixcell/modelos';
import { RecursoBaseService } from 'src/repositories/recursos/RecursoBaseService';

@Injectable()
export class ProductoService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('producto');
    }

    async getCollection() {
        return await this.conectorService.get<Producto[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new Producto({ ...item })));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, Producto>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, new Producto({ ...item })])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<Producto>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new Producto({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<Producto>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new Producto({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<Producto>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new Producto({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}