import { NotaVentaEstado } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../../DocumentoFuenteBaseService';

@Injectable()
export class NvEstadoService extends DocumentoFuenteBaseService {

    constructor(
        private conectorService: ConectorService
    )
    {
        super('nvEstado');
    }

    async getCollection()
    {
        return await this.conectorService.get<NotaVentaEstado[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new NotaVentaEstado({ ...item })) );
    }

    async getObjectById( config: { body: any } )
    {
        return await this.conectorService.post<NotaVentaEstado>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new NotaVentaEstado({ ...item }));
    }

    async create( config: { body: any } )
    {
        return await this.conectorService.post<NotaVentaEstado>( this.getRoute('create'), {
            data: config.body
        } )
        .then( item => new NotaVentaEstado({ ...item }));
    }

    async update( config: { body: any } )
    {
        return await this.conectorService.put<NotaVentaEstado>( this.getRoute('update'), {
            data: config.body
        } )
        .then( item => new NotaVentaEstado({ ...item }));
    }

    async delete( config: { body: any } )
    {
        return await this.conectorService.delete( this.getRoute('delete'), {
            data: config.body
        } );
    }
}