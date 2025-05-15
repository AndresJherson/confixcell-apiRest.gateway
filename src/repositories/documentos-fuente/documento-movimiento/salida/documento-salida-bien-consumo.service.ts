import { DocumentoSalidaBienConsumo } from '@confixcell/modelos';
import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../../DocumentoFuenteBaseService';
import { ModuleRef } from '@nestjs/core';
import { BienConsumoService } from 'src/repositories/recursos/bien/bien-consumo/bien-consumo.service';
import { AlmacenService } from 'src/repositories/recursos/bien/bien-capital/almacen.service';
import { UsuarioService } from 'src/repositories/personas/usuario/usuario.service';

@Injectable()
export class DocumentoSalidaBienConsumoService extends DocumentoFuenteBaseService implements OnModuleInit {

    private usuarioService!: UsuarioService;
    private almacenService!: AlmacenService;
    private bienConsumoService!: BienConsumoService;

    constructor(
        private conectorService: ConectorService,
        private moduleRef: ModuleRef
    )
    {
        super('documentoSalidaBienConsumo');
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

    async getRefModels( data: DocumentoSalidaBienConsumo[] )
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
                    data.flatMap( item => item.salidas.map( sal => sal.almacen?.uuid ) )
                )]
            }
        });

        const recordBienesConsumo = await this.bienConsumoService.getRecordByUuids({
            body: {
                json: [... new Set(
                    data.flatMap( item => item.salidas.map( sal => sal.bienConsumo?.uuid ) )
                )]
            }
        });
        
        return {
            recordUsuarios,
            recordAlmacenes,
            recordBienesConsumo
        }
    }

    setRefModels( data: DocumentoSalidaBienConsumo[], records: Awaited<ReturnType<DocumentoSalidaBienConsumoService['getRefModels']>> )
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

            item.salidas.forEach( sal => {
                if ( sal.almacen?.uuid ) {
                    sal.set({
                        almacen: records.recordAlmacenes[sal.almacen.uuid]
                    })
                }

                if ( sal.bienConsumo?.uuid ) {
                    sal.set({
                        bienConsumo: records.recordBienesConsumo[sal.bienConsumo.uuid]
                    })
                }
            } )
        } )

        return data;
    }

    async getCollection( config?: { complete?: boolean } )
    {
        const data = await this.conectorService.get<DocumentoSalidaBienConsumo[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new DocumentoSalidaBienConsumo({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records);
    }

    async getObjectById( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<DocumentoSalidaBienConsumo>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new DocumentoSalidaBienConsumo({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async createAndIssue( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<DocumentoSalidaBienConsumo>( this.getRoute('createAndIssue'), {
            data: config.body
        } )
        .then( item => new DocumentoSalidaBienConsumo({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async updateVoid( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.put<DocumentoSalidaBienConsumo>( this.getRoute('updateVoid'), {
            data: config.body
        } )
        .then( item => new DocumentoSalidaBienConsumo({ ...item }));

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