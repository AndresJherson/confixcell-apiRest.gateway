import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { ProductoCategoria } from '@confixcell/modelos';
import { RecursoBaseService } from 'src/repositories/recursos/RecursoBaseService';

@Injectable()
export class ProductoCategoriaService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('productoCategoria');
    }

    async getCollection() {
        return await this.conectorService.get<ProductoCategoria[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new ProductoCategoria({ ...item })));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<ProductoCategoria>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new ProductoCategoria({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<ProductoCategoria>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new ProductoCategoria({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<ProductoCategoria>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new ProductoCategoria({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}