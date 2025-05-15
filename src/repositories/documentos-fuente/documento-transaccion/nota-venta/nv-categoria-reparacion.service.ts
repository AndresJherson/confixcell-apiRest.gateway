import { NotaVentaCategoriaReparacion } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../../DocumentoFuenteBaseService';

@Injectable()
export class NvCategoriaReparacionService extends DocumentoFuenteBaseService {

    constructor(
        private conectorService: ConectorService
    )
    {
        super('nvCategoriaReparacion');
    }

    async getCollection()
    {
        return await this.conectorService.get<NotaVentaCategoriaReparacion[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new NotaVentaCategoriaReparacion({ ...item })) );
    }

    async getObjectById( config: { body: any } )
    {
        return await this.conectorService.post<NotaVentaCategoriaReparacion>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new NotaVentaCategoriaReparacion({ ...item }));
    }

    async create( config: { body: any } )
    {
        return await this.conectorService.post<NotaVentaCategoriaReparacion>( this.getRoute('create'), {
            data: config.body
        } )
        .then( item => new NotaVentaCategoriaReparacion({ ...item }));
    }

    async update( config: { body: any } )
    {
        return await this.conectorService.put<NotaVentaCategoriaReparacion>( this.getRoute('update'), {
            data: config.body
        } )
        .then( item => new NotaVentaCategoriaReparacion({ ...item }));
    }

    async delete( config: { body: any } )
    {
        return await this.conectorService.delete( this.getRoute('delete'), {
            data: config.body
        } );
    }
}