import { NotaTransaccionEntrada } from '@confixcell/modelos';
import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../../DocumentoFuenteBaseService';
import { UsuarioService } from 'src/repositories/personas/usuario/usuario.service';
import { ProveedorService } from 'src/repositories/personas/proveedor/proveedor.service';
import { AlmacenService } from 'src/repositories/recursos/bien/bien-capital/almacen.service';
import { BienConsumoService } from 'src/repositories/recursos/bien/bien-consumo/bien-consumo.service';
import { RecursoService } from 'src/repositories/recursos/recurso.service';
import { DocumentoEntradaEfectivoService } from '../../documento-movimiento/entrada/documento-entrada-efectivo.service';
import { DocumentoEntradaBienConsumoService } from '../../documento-movimiento/entrada/documento-entrada-bien-consumo.service';
import { DocumentoSalidaEfectivoService } from '../../documento-movimiento/salida/documento-salida-efectivo.service';
import { DocumentoSalidaBienConsumoService } from '../../documento-movimiento/salida/documento-salida-bien-consumo.service';
import { ModuleRef } from '@nestjs/core';
import { DocumentoIdentificacionService } from 'src/repositories/personas/documento-identificacion.service';

@Injectable()
export class NotaTransaccionEntradaService extends DocumentoFuenteBaseService implements OnModuleInit {

    private usuarioService!: UsuarioService;
    private proveedorService!: ProveedorService;
    private documentoIdentificacionService!: DocumentoIdentificacionService;
    private recursoService!: RecursoService;
    private almacenService!: AlmacenService;
    private bienConsumoService!: BienConsumoService;

    private documentoEntradaEfectivoService!: DocumentoEntradaEfectivoService;
    private documentoEntradaBienConsumoService!: DocumentoEntradaBienConsumoService;
    private documentoSalidaEfectivoService!: DocumentoSalidaEfectivoService;
    private documentoSalidaBienConsumoService!: DocumentoSalidaBienConsumoService;

    constructor(
        private conectorService: ConectorService,
        private moduleRef: ModuleRef
    )
    {
        super('notaTransaccionEntrada');
    }

    onModuleInit() 
    {
        this.usuarioService = this.moduleRef.get( UsuarioService, { strict: false } );
        this.proveedorService = this.moduleRef.get( ProveedorService, { strict: false } );
        this.documentoIdentificacionService = this.moduleRef.get( DocumentoIdentificacionService, { strict: false } );
        this.recursoService = this.moduleRef.get( RecursoService, { strict: false } );
        this.almacenService = this.moduleRef.get( AlmacenService, { strict: false } );
        this.bienConsumoService = this.moduleRef.get( BienConsumoService, { strict: false } );

        this.documentoEntradaEfectivoService = this.moduleRef.get( DocumentoEntradaEfectivoService, { strict: false } );
        this.documentoEntradaBienConsumoService = this.moduleRef.get( DocumentoEntradaBienConsumoService, { strict: false } );
        this.documentoSalidaEfectivoService = this.moduleRef.get( DocumentoSalidaEfectivoService, { strict: false } );
        this.documentoSalidaBienConsumoService = this.moduleRef.get( DocumentoSalidaBienConsumoService, { strict: false } );
    
        if ( !this.usuarioService ) throw new InternalServerErrorException(`${UsuarioService.name} NO PROPORCIONADO`);
        if ( !this.proveedorService ) throw new InternalServerErrorException(`${ProveedorService.name} NO PROPORCIONADO`);
        if ( !this.documentoIdentificacionService ) throw new InternalServerErrorException(`${DocumentoIdentificacionService.name} NO PROPORCIONADO`);
        if ( !this.recursoService ) throw new InternalServerErrorException(`${RecursoService.name} NO PROPORCIONADO`);
        if ( !this.almacenService ) throw new InternalServerErrorException(`${AlmacenService.name} NO PROPORCIONADO`);
        if ( !this.bienConsumoService ) throw new InternalServerErrorException(`${BienConsumoService.name} NO PROPORCIONADO`);

        if ( !this.documentoEntradaEfectivoService ) throw new InternalServerErrorException(`${DocumentoEntradaEfectivoService.name} NO PROPORCIONADO`);
        if ( !this.documentoEntradaBienConsumoService ) throw new InternalServerErrorException(`${DocumentoEntradaBienConsumoService.name} NO PROPORCIONADO`);
        if ( !this.documentoSalidaEfectivoService ) throw new InternalServerErrorException(`${DocumentoSalidaEfectivoService.name} NO PROPORCIONADO`);
        if ( !this.documentoSalidaBienConsumoService ) throw new InternalServerErrorException(`${DocumentoSalidaBienConsumoService.name} NO PROPORCIONADO`);
    }

    async getRefModels( data: NotaTransaccionEntrada[] )
    {
        const recordUsuarios = await this.usuarioService.getRecordByUuids({
            body: {
                json: [ ...new Set(
                    data.flatMap( item => [
                        item.usuario?.uuid,
                        ...item.notas.map( nota => nota.usuario?.uuid ),
                        ...item.docsEntradaEfectivo.flatMap( doc => [
                            doc.usuario?.uuid,
                            ...doc.notas.map( nota => nota.usuario?.uuid )
                        ] ),
                        ...item.docsEntradaBienConsumo.flatMap( doc => [
                            doc.usuario?.uuid,
                            ...doc.notas.map( nota => nota.usuario?.uuid )
                        ] ),
                        ...item.docsSalidaEfectivo.flatMap( doc => [
                            doc.usuario?.uuid,
                            ...doc.notas.map( nota => nota.usuario?.uuid )
                        ] ),
                        ...item.docsSalidaBienConsumo.flatMap( doc => [
                            doc.usuario?.uuid,
                            ...doc.notas.map( nota => nota.usuario?.uuid )
                        ] )
                    ] )
                ) ]
            }
        })

        const recordProveedores = await this.proveedorService.getRecordByUuids({
            body: {
                json: [...new Set(
                    data.map( item => item.proveedor?.uuid )
                )]
            }
        });

        const recordDocumentosIdentificacion = await this.documentoIdentificacionService.getRecordByUuids({
            body: {
                json: [...new Set(
                    data.map( item => item.proveedorDocumentoIdentificacion?.uuid )
                )]
            }
        })

        const recordRecursos = await this.recursoService.getRecordByUuids({
            body: {
                json: [...new Set(
                    data.flatMap( item => item.detalles.map( detalle => detalle.recurso?.uuid ) )
                )]
            }
        });

        const recordAlmacenes = await this.almacenService.getRecordByUuids({
            body: {
                json: [ ...new Set(
                    data.flatMap( item => [
                        ...item.docsEntradaBienConsumo.flatMap( doc => doc.entradas.map( ent => ent.almacen?.uuid ) ),
                        ...item.docsSalidaBienConsumo.flatMap( doc => doc.salidas.map( sal => sal.almacen?.uuid ) ),
                    ] 
                ) ) ]
            }
        });

        const recordBienesConsumo = await this.bienConsumoService.getRecordByUuids({
            body: {
                json: [ ...new Set(
                    data.flatMap( item => [
                        ...item.docsEntradaBienConsumo.flatMap( doc => doc.entradas.map( ent => ent.bienConsumo?.uuid ) ),
                        ...item.docsSalidaBienConsumo.flatMap( doc => doc.salidas.map( sal => sal.bienConsumo?.uuid ) ),
                    ] )
                ) ]
            }
        });

        return {
            recordUsuarios,
            recordProveedores,
            recordDocumentosIdentificacion,
            recordRecursos,
            recordAlmacenes,
            recordBienesConsumo
        }
    }

    setRefModels( data: NotaTransaccionEntrada[], records: Awaited<ReturnType<NotaTransaccionEntradaService['getRefModels']>> )
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


            if ( item.proveedor?.uuid ) {
                item.set({
                    proveedor: records.recordProveedores[item.proveedor.uuid]
                })
            }

            if ( item.proveedorDocumentoIdentificacion?.uuid ) {
                item.set({
                    proveedorDocumentoIdentificacion: records.recordDocumentosIdentificacion[item.proveedorDocumentoIdentificacion.uuid]
                })
            }

            item.detalles.forEach( detalle => {
                if ( detalle.recurso?.uuid ) {
                    detalle.set({
                        recurso: records.recordRecursos[detalle.recurso.uuid]
                    })
                }
            } )

            
            this.documentoEntradaEfectivoService.setRefModels( item.docsEntradaEfectivo, records );
            this.documentoEntradaBienConsumoService.setRefModels( item.docsEntradaBienConsumo, records );
            this.documentoSalidaEfectivoService.setRefModels( item.docsSalidaEfectivo, records );
            this.documentoSalidaBienConsumoService.setRefModels( item.docsSalidaBienConsumo, records );
        } )


        return data;
    }


    async getCollection( config?: { complete?: boolean } )  
    {
        const data = await this.conectorService.get<NotaTransaccionEntrada[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new NotaTransaccionEntrada({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records);
    }

    async getCollectionByUsuarioId( config: { body: any, complete?: boolean } )
    {
        const data = await this.conectorService.post<NotaTransaccionEntrada[]>( this.getRoute('getCollectionByUsuarioId'), {
            data: config.body
        } )
        .then( data => data.map( item => new NotaTransaccionEntrada({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records )
            .sort( ( a, b ) => ( a.id ?? 0 ) - ( b.id ?? 0 ) );
    }

    async getCollectionByProveedorId( config: { body: any, complete?: boolean } )
    {
        const data = await this.conectorService.post<NotaTransaccionEntrada[]>( this.getRoute('getCollectionByProveedorId'), {
            data: config.body
        } )
        .then( data => data.map( item => new NotaTransaccionEntrada({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records )
            .sort( ( a, b ) => ( a.id ?? 0 ) - ( b.id ?? 0 ) );
    }

    async getObjectById( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<NotaTransaccionEntrada>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new NotaTransaccionEntrada({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async create( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<NotaTransaccionEntrada>( this.getRoute('create'), {
            data: config.body
        } )
        .then( item => new NotaTransaccionEntrada({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async createAndIssue( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<NotaTransaccionEntrada>( this.getRoute('createAndIssue'), {
            data: config.body
        } )
        .then( item => new NotaTransaccionEntrada({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async update( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.put<NotaTransaccionEntrada>( this.getRoute('update'), {
            data: config.body
        } )
        .then( item => new NotaTransaccionEntrada({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async updateAndIssue( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.put<NotaTransaccionEntrada>( this.getRoute('updateAndIssue'), {
            data: config.body
        } )
        .then( item => new NotaTransaccionEntrada({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async updateVoid( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.put<NotaTransaccionEntrada>( this.getRoute('updateVoid'), {
            data: config.body
        } )
        .then( item => new NotaTransaccionEntrada({ ...item }));

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