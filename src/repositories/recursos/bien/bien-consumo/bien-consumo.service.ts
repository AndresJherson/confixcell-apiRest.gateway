import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { BienConsumo } from '@confixcell/modelos';
import { RecursoBaseService } from '../../RecursoBaseService';

@Injectable()
export class BienConsumoService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('bienConsumo');
    }

    async getCollection() {
        return await this.conectorService.get<BienConsumo[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => BienConsumo.initialize([ item ])[0] ));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, BienConsumo>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, BienConsumo.initialize([ item ])[0] ])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<BienConsumo>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => BienConsumo.initialize([ item ])[0] );
    }
}