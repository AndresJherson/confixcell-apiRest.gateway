import { MedioTransferencia } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from './DocumentoFuenteBaseService';

@Injectable()
export class MedioTransferenciaService extends DocumentoFuenteBaseService {

    constructor(
        private conectorService: ConectorService
    )
    {
        super('medioTransferencia');
    }

    async getCollection()
    {
        return await this.conectorService.get<MedioTransferencia[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new MedioTransferencia({ ...item })) );
    }

    async getObjectById( config: { body: any } )
    {
        return await this.conectorService.post<MedioTransferencia>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new MedioTransferencia({ ...item }));
    }

    async create( config: { body: any } )
    {
        return await this.conectorService.post<MedioTransferencia>( this.getRoute('create'), {
            data: config.body
        } )
        .then( item => new MedioTransferencia({ ...item }));
    }

    async update( config: { body: any } )
    {
        return await this.conectorService.put<MedioTransferencia>( this.getRoute('update'), {
            data: config.body
        } )
        .then( item => new MedioTransferencia({ ...item }));
    }

    async delete( config: { body: any } )
    {
        return await this.conectorService.delete( this.getRoute('delete'), {
            data: config.body
        } );
    }
}