import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { Calidad } from '@confixcell/modelos';
import { RecursoBaseService } from 'src/repositories/recursos/RecursoBaseService';

@Injectable()
export class CalidadService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('calidad');
    }

    async getCollection() {
        return await this.conectorService.get<Calidad[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new Calidad({ ...item })));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<Calidad>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new Calidad({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<Calidad>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new Calidad({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<Calidad>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new Calidad({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}