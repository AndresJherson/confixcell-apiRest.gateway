import { ComprobanteTipo } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../../DocumentoFuenteBaseService';

@Injectable()
export class ComprobanteTipoService extends DocumentoFuenteBaseService {

    constructor(
        private conectorService: ConectorService
    )
    {
        super('comprobanteTipo');
    }

    async getCollection()
    {
        return await this.conectorService.get<ComprobanteTipo[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new ComprobanteTipo({ ...item })) );
    }

    async getObjectById( config: { body: any } )
    {
        return await this.conectorService.post<ComprobanteTipo>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new ComprobanteTipo({ ...item }));
    }

    async create( config: { body: any } )
    {
        return await this.conectorService.post<ComprobanteTipo>( this.getRoute('create'), {
            data: config.body
        } )
        .then( item => new ComprobanteTipo({ ...item }));
    }

    async update( config: { body: any } )
    {
        return await this.conectorService.put<ComprobanteTipo>( this.getRoute('update'), {
            data: config.body
        } )
        .then( item => new ComprobanteTipo({ ...item }));
    }

    async delete( config: { body: any } )
    {
        return await this.conectorService.delete( this.getRoute('delete'), {
            data: config.body
        } );
    }
}