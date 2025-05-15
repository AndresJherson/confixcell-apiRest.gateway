import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PantallaMarca } from '@confixcell/modelos';
import { RecursoBaseService } from 'src/repositories/recursos/RecursoBaseService';

@Injectable()
export class PantallaMarcaService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('pantallaMarca');
    }

    async getCollection() {
        return await this.conectorService.get<PantallaMarca[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new PantallaMarca({ ...item })));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<PantallaMarca>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new PantallaMarca({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<PantallaMarca>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new PantallaMarca({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<PantallaMarca>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new PantallaMarca({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}