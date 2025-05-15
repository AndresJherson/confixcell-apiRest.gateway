import { LiquidacionTipo } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from './DocumentoFuenteBaseService';

@Injectable()
export class LiquidacionTipoService extends DocumentoFuenteBaseService {

    constructor(
        private conectorService: ConectorService
    )
    {
        super('liquidacionTipo');
    }

    async getCollection()
    {
        return await this.conectorService.get<LiquidacionTipo[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new LiquidacionTipo({ ...item })) );
    }

    async getObjectById( config: { body: any } )
    {
        return await this.conectorService.post<LiquidacionTipo>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new LiquidacionTipo({ ...item }));
    }
}
