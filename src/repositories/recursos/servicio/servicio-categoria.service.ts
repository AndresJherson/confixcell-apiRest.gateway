import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { RecursoBaseService } from '../RecursoBaseService';
import { ServicioCategoria } from '@confixcell/modelos';

@Injectable()
export class ServicioCategoriaService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('servicioCategoria');
    }

    async getCollection() {
        return await this.conectorService.get<ServicioCategoria[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new ServicioCategoria({ ...item })));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<ServicioCategoria>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new ServicioCategoria({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<ServicioCategoria>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new ServicioCategoria({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<ServicioCategoria>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new ServicioCategoria({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}