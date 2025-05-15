import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { Magnitud } from '@confixcell/modelos';
import { RecursoBaseService } from 'src/repositories/recursos/RecursoBaseService';

@Injectable()
export class MagnitudService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('magnitud');
    }

    async getCollection() {
        return await this.conectorService.get<Magnitud[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new Magnitud({ ...item })));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<Magnitud>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new Magnitud({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<Magnitud>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new Magnitud({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<Magnitud>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new Magnitud({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}