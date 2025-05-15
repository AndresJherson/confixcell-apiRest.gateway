import { NotaTransaccionSalida } from '@confixcell/modelos';
import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../../DocumentoFuenteBaseService';
import { UsuarioService } from 'src/repositories/personas/usuario/usuario.service';
import { DocumentoIdentificacionService } from 'src/repositories/personas/documento-identificacion.service';
import { RecursoService } from 'src/repositories/recursos/recurso.service';
import { AlmacenService } from 'src/repositories/recursos/bien/bien-capital/almacen.service';
import { BienConsumoService } from 'src/repositories/recursos/bien/bien-consumo/bien-consumo.service';
import { DocumentoEntradaEfectivoService } from '../../documento-movimiento/entrada/documento-entrada-efectivo.service';
import { DocumentoEntradaBienConsumoService } from '../../documento-movimiento/entrada/documento-entrada-bien-consumo.service';
import { DocumentoSalidaEfectivoService } from '../../documento-movimiento/salida/documento-salida-efectivo.service';
import { DocumentoSalidaBienConsumoService } from '../../documento-movimiento/salida/documento-salida-bien-consumo.service';
import { ClienteService } from 'src/repositories/personas/cliente/cliente.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class NotaTransaccionSalidaService extends DocumentoFuenteBaseService implements OnModuleInit {

    private usuarioService!: UsuarioService;
    private clienteService!: ClienteService;
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
        super('notaTransaccionSalida');
    }

    onModuleInit() 
    {
        this.usuarioService = this.moduleRef.get( UsuarioService, { strict: false } );
        this.clienteService = this.moduleRef.get( ClienteService, { strict: false } );
        this.documentoIdentificacionService = this.moduleRef.get( DocumentoIdentificacionService, { strict: false } );
        this.recursoService = this.moduleRef.get( RecursoService, { strict: false } );
        this.almacenService = this.moduleRef.get( AlmacenService, { strict: false } );
        this.bienConsumoService = this.moduleRef.get( BienConsumoService, { strict: false } );

        this.documentoEntradaEfectivoService = this.moduleRef.get( DocumentoEntradaEfectivoService, { strict: false } );
        this.documentoEntradaBienConsumoService = this.moduleRef.get( DocumentoEntradaBienConsumoService, { strict: false } );
        this.documentoSalidaEfectivoService = this.moduleRef.get( DocumentoSalidaEfectivoService, { strict: false } );
        this.documentoSalidaBienConsumoService = this.moduleRef.get( DocumentoSalidaBienConsumoService, { strict: false } );
    
        if ( !this.usuarioService ) throw new InternalServerErrorException(`${UsuarioService.name} NO PROPORCIONADO`);
        if ( !this.clienteService ) throw new InternalServerErrorException(`${ClienteService.name} NO PROPORCIONADO`);
        if ( !this.documentoIdentificacionService ) throw new InternalServerErrorException(`${DocumentoIdentificacionService.name} NO PROPORCIONADO`);
        if ( !this.recursoService ) throw new InternalServerErrorException(`${RecursoService.name} NO PROPORCIONADO`);
        if ( !this.almacenService ) throw new InternalServerErrorException(`${AlmacenService.name} NO PROPORCIONADO`);
        if ( !this.bienConsumoService ) throw new InternalServerErrorException(`${BienConsumoService.name} NO PROPORCIONADO`);

        if ( !this.documentoEntradaEfectivoService ) throw new InternalServerErrorException(`${DocumentoEntradaEfectivoService.name} NO PROPORCIONADO`);
        if ( !this.documentoEntradaBienConsumoService ) throw new InternalServerErrorException(`${DocumentoEntradaBienConsumoService.name} NO PROPORCIONADO`);
        if ( !this.documentoSalidaEfectivoService ) throw new InternalServerErrorException(`${DocumentoSalidaEfectivoService.name} NO PROPORCIONADO`);
        if ( !this.documentoSalidaBienConsumoService ) throw new InternalServerErrorException(`${DocumentoSalidaBienConsumoService.name} NO PROPORCIONADO`);
    }

    async getRefModels( data: NotaTransaccionSalida[] )
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

        const recordClientes = await this.clienteService.getRecordByUuids({
            body: {
                json: [...new Set(
                    data.map( item => item.cliente?.uuid )
                )]
            }
        });

        const recordDocumentosIdentificacion = await this.documentoIdentificacionService.getRecordByUuids({
            body: {
                json: [...new Set(
                    data.map( item => item.clienteDocumentoIdentificacion?.uuid )
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
            recordClientes,
            recordDocumentosIdentificacion,
            recordRecursos,
            recordAlmacenes,
            recordBienesConsumo
        }
    }

    setRefModels( data: NotaTransaccionSalida[], records: Awaited<ReturnType<NotaTransaccionSalidaService['getRefModels']>> )
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


            if ( item.cliente?.uuid ) {
                item.set({
                    cliente: records.recordClientes[item.cliente.uuid]
                })
            }

            if ( item.clienteDocumentoIdentificacion?.uuid ) {
                item.set({
                    clienteDocumentoIdentificacion: records.recordDocumentosIdentificacion[item.clienteDocumentoIdentificacion.uuid]
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
        const data = await this.conectorService.get<NotaTransaccionSalida[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new NotaTransaccionSalida({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records);
    }

    async getCollectionByUsuarioId( config: { body: any, complete?: boolean } )
    {
        const data = await this.conectorService.post<NotaTransaccionSalida[]>( this.getRoute('getCollectionByUsuarioId'), {
            data: config.body
        } )
        .then( data => data.map( item => new NotaTransaccionSalida({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records )
            .sort( ( a, b ) => ( a.id ?? 0 ) - ( b.id ?? 0 ) );
    }

    async getCollectionByClienteId( config: { body: any, complete?: boolean } )
    {
        const data = await this.conectorService.post<NotaTransaccionSalida[]>( this.getRoute('getCollectionByClienteId'), {
            data: config.body
        } )
        .then( data => data.map( item => new NotaTransaccionSalida({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records )
            .sort( ( a, b ) => ( a.id ?? 0 ) - ( b.id ?? 0 ) );
    }

    async getObjectById( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<NotaTransaccionSalida>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new NotaTransaccionSalida({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async create( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<NotaTransaccionSalida>( this.getRoute('create'), {
            data: config.body
        } )
        .then( item => new NotaTransaccionSalida({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async createAndIssue( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<NotaTransaccionSalida>( this.getRoute('createAndIssue'), {
            data: config.body
        } )
        .then( item => new NotaTransaccionSalida({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async update( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.put<NotaTransaccionSalida>( this.getRoute('update'), {
            data: config.body
        } )
        .then( item => new NotaTransaccionSalida({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async updateAndIssue( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.put<NotaTransaccionSalida>( this.getRoute('updateAndIssue'), {
            data: config.body
        } )
        .then( item => new NotaTransaccionSalida({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async updateVoid( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.put<NotaTransaccionSalida>( this.getRoute('updateVoid'), {
            data: config.body
        } )
        .then( item => new NotaTransaccionSalida({ ...item }));

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