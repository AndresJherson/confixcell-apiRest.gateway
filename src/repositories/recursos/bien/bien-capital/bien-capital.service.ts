import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { BienCapital } from '@confixcell/modelos';
import { RecursoBaseService } from '../../RecursoBaseService';

@Injectable()
export class BienCapitalService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('bienCapital');
    }

    async getCollection() {
        return await this.conectorService.get<BienCapital[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new BienCapital({ ...item })));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, BienCapital>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, new BienCapital({ ...item })])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<BienCapital>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new BienCapital({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<BienCapital>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new BienCapital({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<BienCapital>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new BienCapital({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}