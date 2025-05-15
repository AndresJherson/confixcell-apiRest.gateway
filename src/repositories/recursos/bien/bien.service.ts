import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { RecursoBaseService } from '../RecursoBaseService';
import { Bien } from '@confixcell/modelos';

@Injectable()
export class BienService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('bien');
    }

    async getCollection() {
        return await this.conectorService.get<Bien[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => Bien.initialize([ item ])[0] ));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, Bien>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, Bien.initialize([ item ])[0] ])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<Bien>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => Bien.initialize([ item ])[0] );
    }
}