import { ClienteNatural } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PersonaBaseService } from '../PersonaBaseService';

@Injectable()
export class ClienteNaturalService extends PersonaBaseService {

    constructor(
        private conectorService: ConectorService
    )
    {
        super('clienteNatural');
    }


    async getCollection()
    {
        return await this.conectorService.get<ClienteNatural[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new ClienteNatural({ ...item })) );
    }


    async getRecordByUuids( config: { body: any } )
    {
        return await this.conectorService.post<Record<string,ClienteNatural>>( this.getRoute('getRecordByUuids'), {
            data: config.body
        } )
        .then( data => Object.fromEntries( Object.entries( data ).map( ([ uuid, item ]) => [ uuid, new ClienteNatural({ ...item }) ] ) ) )
    }


    async getObjectById( config: { body: any } )
    {
        return await this.conectorService.post<ClienteNatural>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new ClienteNatural({ ...item }));
    }


    async create( config: { body: any } )
    {
        return await this.conectorService.post<ClienteNatural>( this.getRoute('create'), {
            data: config.body
        } )
        .then( item => new ClienteNatural({ ...item }));
    }


    async update( config: { body: any } )
    {
        return await this.conectorService.put<ClienteNatural>( this.getRoute('update'), {
            data: config.body
        } )
        .then( item => new ClienteNatural({ ...item }));
    }


    async delete( config: { body: any } )
    {
        return await this.conectorService.delete( this.getRoute('delete'), {
            data: config.body
        } );
    }
}
