import { Nota } from '@confixcell/modelos';
import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../DocumentoFuenteBaseService';
import { ModuleRef } from '@nestjs/core';
import { UsuarioService } from 'src/repositories/personas/usuario/usuario.service';

@Injectable()
export class NotaService extends DocumentoFuenteBaseService implements OnModuleInit {

    private usuarioService!: UsuarioService;

    constructor(
        private conectorService: ConectorService,
        private moduleRef: ModuleRef
    )
    {
        super('nota');
    }

    onModuleInit() 
    {
        this.usuarioService = this.moduleRef.get( UsuarioService, { strict: false } );
    
        if ( !this.usuarioService ) throw new InternalServerErrorException(`${UsuarioService.name} NO PROPORCIONADO`);
    }

    async getRefModels( data: Nota[] )
    {
        const recordUsuarios = await this.usuarioService.getRecordByUuids({
            body: {
                json: [...new Set(
                    data.map( nota => nota.usuario?.uuid )
                )]
            }
        })

        return {
            recordUsuarios
        }
    }

    setRefModels( data: Nota[], records: Awaited<ReturnType<NotaService['getRefModels']>> )
    {
        data.forEach( nota => {
            if ( nota.usuario?.uuid ) {
                nota.set({
                    usuario: records.recordUsuarios[nota.usuario.uuid]
                })
            }
        } )

        return data;
    }

    async getCollectionByDocumentoId( config: { body: any, complete?: boolean } )
    {
        const data = await this.conectorService.post<Nota[]>( this.getRoute('getCollectionByDocumentoId'), {
            data: config.body
        } )
        .then( data => data.map( item => new Nota({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records);
    }

    async getObjectById( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<Nota>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new Nota({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async create( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<Nota>( this.getRoute('create'), {
            data: config.body
        } )
        .then( item => new Nota({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async delete( config: { body: any } )
    {
        return await this.conectorService.delete( this.getRoute('delete'), {
            data: config.body
        } );
    }
}