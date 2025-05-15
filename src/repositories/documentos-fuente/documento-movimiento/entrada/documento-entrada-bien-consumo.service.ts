import { DocumentoEntradaBienConsumo } from '@confixcell/modelos';
import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../../DocumentoFuenteBaseService';
import { UsuarioService } from 'src/repositories/personas/usuario/usuario.service';
import { ModuleRef } from '@nestjs/core';
import { BienConsumoService } from 'src/repositories/recursos/bien/bien-consumo/bien-consumo.service';
import { AlmacenService } from 'src/repositories/recursos/bien/bien-capital/almacen.service';

@Injectable()
export class DocumentoEntradaBienConsumoService extends DocumentoFuenteBaseService implements OnModuleInit {

    private usuarioService!: UsuarioService;
    private almacenService!: AlmacenService;
    private bienConsumoService!: BienConsumoService;

    constructor(
        private conectorService: ConectorService,
        private moduleRef: ModuleRef
    )
    {
        super('documentoEntradaBienConsumo');
    }

    onModuleInit() 
    {
        this.usuarioService = this.moduleRef.get( UsuarioService, { strict: false } );
        this.almacenService = this.moduleRef.get( AlmacenService, { strict: false } );
        this.bienConsumoService = this.moduleRef.get( BienConsumoService, { strict: false } );
    
        if ( !this.usuarioService ) throw new InternalServerErrorException(`${UsuarioService.name} NO PROPORCIONADO`);
        if ( !this.almacenService ) throw new InternalServerErrorException(`${AlmacenService.name} NO PROPORCIONADO`);
        if ( !this.bienConsumoService ) throw new InternalServerErrorException(`${BienConsumoService.name} NO PROPORCIONADO`);
    }

    async getRefModels( data: DocumentoEntradaBienConsumo[] )
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

        const recordAlmacenes = await this.almacenService.getRecordByUuids({
            body: {
                json: [... new Set(
                    data.flatMap( item => item.entradas.map( ent => ent.almacen?.uuid ) )
                )]
            }
        });

        const recordBienesConsumo = await this.bienConsumoService.getRecordByUuids({
            body: {
                json: [... new Set(
                    data.flatMap( item => item.entradas.map( ent => ent.bienConsumo?.uuid ) )
                )]
            }
        });

        return {
            recordUsuarios,
            recordAlmacenes,
            recordBienesConsumo
        }
    }

    setRefModels( data: DocumentoEntradaBienConsumo[], records: Awaited<ReturnType<DocumentoEntradaBienConsumoService['getRefModels']>> )
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

            item.entradas.forEach( ent => {
                if ( ent.almacen?.uuid ) {
                    ent.set({
                        almacen: records.recordAlmacenes[ent.almacen.uuid]
                    })
                }

                if ( ent.bienConsumo?.uuid ) {
                    ent.set({
                        bienConsumo: records.recordBienesConsumo[ent.bienConsumo.uuid]
                    })
                }
            } )
        } )

        return data;
    }

    async getCollection( config?: { complete?: boolean } )
    {
        const data = await this.conectorService.get<DocumentoEntradaBienConsumo[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new DocumentoEntradaBienConsumo({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records);
    }

    async getObjectById( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<DocumentoEntradaBienConsumo>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new DocumentoEntradaBienConsumo({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async createAndIssue( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<DocumentoEntradaBienConsumo>( this.getRoute('createAndIssue'), {
            data: config.body
        } )
        .then( item => new DocumentoEntradaBienConsumo({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async updateVoid( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.put<DocumentoEntradaBienConsumo>( this.getRoute('updateVoid'), {
            data: config.body
        } )
        .then( item => new DocumentoEntradaBienConsumo({ ...item }));

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