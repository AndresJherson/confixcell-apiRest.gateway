import { DocumentoEntradaEfectivo } from '@confixcell/modelos';
import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../../DocumentoFuenteBaseService';
import { UsuarioService } from 'src/repositories/personas/usuario/usuario.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class DocumentoEntradaEfectivoService extends DocumentoFuenteBaseService implements OnModuleInit {

    private usuarioService!: UsuarioService;

    constructor(
        private conectorService: ConectorService,
        private moduleRef: ModuleRef
    )
    {
        super('documentoEntradaEfectivo');
    }

    onModuleInit() 
    {
        this.usuarioService = this.moduleRef.get( UsuarioService, { strict: false } );
    
        if ( !this.usuarioService ) throw new InternalServerErrorException(`${UsuarioService.name} NO PROPORCIONADO`);
    }

    async getRefModels( data: DocumentoEntradaEfectivo[] )
    {
        const recordUsuarios = await this.usuarioService.getRecordByUuids({
            body: {
                json: [...new Set(
                    data.flatMap( item => [
                        item.usuario?.uuid,
                        ...item.notas.map( nota => nota.usuario?.uuid )
                    ] )
                )]
            }
        })

        return {
            recordUsuarios
        }
    }

    setRefModels( data: DocumentoEntradaEfectivo[], records: Awaited<ReturnType<DocumentoEntradaEfectivoService['getRefModels']>> )
    {
        data.forEach( item => {
            if ( item.usuario?.uuid ) {
                item.set({
                    usuario: records.recordUsuarios[item.usuario.uuid]
                })
            }

            item.notas.forEach( nota => {
                if ( nota.usuario?.uuid ) {
                    nota.set({
                        usuario: records.recordUsuarios[nota.usuario.uuid]
                    })
                }
            } )
        } )

        return data;
    }

    async getCollection( config?: { complete?: boolean } )
    {
        const data = await this.conectorService.get<DocumentoEntradaEfectivo[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new DocumentoEntradaEfectivo({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records);
    }

    async getObjectById( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<DocumentoEntradaEfectivo>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new DocumentoEntradaEfectivo({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async createAndIssue( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<DocumentoEntradaEfectivo>( this.getRoute('createAndIssue'), {
            data: config.body
        } )
        .then( item => new DocumentoEntradaEfectivo({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async updateVoid( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.put<DocumentoEntradaEfectivo>( this.getRoute('updateVoid'), {
            data: config.body
        } )
        .then( item => new DocumentoEntradaEfectivo({ ...item }));

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