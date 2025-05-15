import { NotaVentaPrioridad } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../../DocumentoFuenteBaseService';

@Injectable()
export class NvPrioridadService extends DocumentoFuenteBaseService {

    constructor(
        private conectorService: ConectorService
    )
    {
        super('nvPrioridad');
    }

    async getCollection()
    {
        return await this.conectorService.get<NotaVentaPrioridad[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new NotaVentaPrioridad({ ...item })) );
    }

    async getObjectById( config: { body: any } )
    {
        return await this.conectorService.post<NotaVentaPrioridad>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new NotaVentaPrioridad({ ...item }));
    }

    async create( config: { body: any } )
    {
        return await this.conectorService.post<NotaVentaPrioridad>( this.getRoute('create'), {
            data: config.body
        } )
        .then( item => new NotaVentaPrioridad({ ...item }));
    }

    async update( config: { body: any } )
    {
        return await this.conectorService.put<NotaVentaPrioridad>( this.getRoute('update'), {
            data: config.body
        } )
        .then( item => new NotaVentaPrioridad({ ...item }));
    }

    async delete( config: { body: any } )
    {
        return await this.conectorService.delete( this.getRoute('delete'), {
            data: config.body
        } );
    }
}