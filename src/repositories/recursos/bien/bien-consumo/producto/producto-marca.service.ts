import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { ProductoMarca } from '@confixcell/modelos';
import { RecursoBaseService } from 'src/repositories/recursos/RecursoBaseService';

@Injectable()
export class ProductoMarcaService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('productoMarca');
    }

    async getCollection() {
        return await this.conectorService.get<ProductoMarca[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new ProductoMarca({ ...item })));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<ProductoMarca>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new ProductoMarca({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<ProductoMarca>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new ProductoMarca({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<ProductoMarca>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new ProductoMarca({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}