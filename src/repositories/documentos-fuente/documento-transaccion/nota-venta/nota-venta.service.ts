import { NotaVenta } from '@confixcell/modelos';
import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../../DocumentoFuenteBaseService';
import { UsuarioService } from 'src/repositories/personas/usuario/usuario.service';
import { AlmacenService } from 'src/repositories/recursos/bien/bien-capital/almacen.service';
import { BienConsumoService } from 'src/repositories/recursos/bien/bien-consumo/bien-consumo.service';
import { ModuleRef } from '@nestjs/core';
import { ServicioService } from 'src/repositories/recursos/servicio/servicio.service';
import { PantallaModeloService } from 'src/repositories/recursos/bien/bien-consumo/pantalla/pantalla-modelo.service';
import { ClienteService } from 'src/repositories/personas/cliente/cliente.service';
import { DocumentoEntradaEfectivoService } from '../../documento-movimiento/entrada/documento-entrada-efectivo.service';
import { DocumentoEntradaBienConsumoService } from '../../documento-movimiento/entrada/documento-entrada-bien-consumo.service';
import { DocumentoSalidaEfectivoService } from '../../documento-movimiento/salida/documento-salida-efectivo.service';
import { DocumentoSalidaBienConsumoService } from '../../documento-movimiento/salida/documento-salida-bien-consumo.service';

@Injectable()
export class NotaVentaService extends DocumentoFuenteBaseService implements OnModuleInit {

    private usuarioService!: UsuarioService;
    private clienteService!: ClienteService;
    private almacenService!: AlmacenService;
    private bienConsumoService!: BienConsumoService;
    private servicioService!: ServicioService;
    private pantallaModeloService!: PantallaModeloService;

    private documentoEntradaEfectivoService!: DocumentoEntradaEfectivoService;
    private documentoEntradaBienConsumoService!: DocumentoEntradaBienConsumoService;
    private documentoSalidaEfectivoService!: DocumentoSalidaEfectivoService;
    private documentoSalidaBienConsumoService!: DocumentoSalidaBienConsumoService;

    constructor(
        private conectorService: ConectorService,
        private moduleRef: ModuleRef
    )
    {
        super('notaVenta');
    }

    onModuleInit() 
    {
        this.usuarioService = this.moduleRef.get( UsuarioService, { strict: false } );
        this.clienteService = this.moduleRef.get( ClienteService, { strict: false } );
        this.almacenService = this.moduleRef.get( AlmacenService, { strict: false } );
        this.bienConsumoService = this.moduleRef.get( BienConsumoService, { strict: false } );
        this.servicioService = this.moduleRef.get( ServicioService, { strict: false } );
        this.pantallaModeloService = this.moduleRef.get( PantallaModeloService, { strict: false } );

        this.documentoEntradaEfectivoService = this.moduleRef.get( DocumentoEntradaEfectivoService, { strict: false } );
        this.documentoEntradaBienConsumoService = this.moduleRef.get( DocumentoEntradaBienConsumoService, { strict: false } );
        this.documentoSalidaEfectivoService = this.moduleRef.get( DocumentoSalidaEfectivoService, { strict: false } );
        this.documentoSalidaBienConsumoService = this.moduleRef.get( DocumentoSalidaBienConsumoService, { strict: false } );
    
        if ( !this.usuarioService ) throw new InternalServerErrorException(`${UsuarioService.name} NO PROPORCIONADO`);
        if ( !this.clienteService ) throw new InternalServerErrorException(`${ClienteService.name} NO PROPORCIONADO`);
        if ( !this.almacenService ) throw new InternalServerErrorException(`${AlmacenService.name} NO PROPORCIONADO`);
        if ( !this.bienConsumoService ) throw new InternalServerErrorException(`${BienConsumoService.name} NO PROPORCIONADO`);
        if ( !this.servicioService ) throw new InternalServerErrorException(`${ServicioService.name} NO PROPORCIONADO`);
        if ( !this.pantallaModeloService ) throw new InternalServerErrorException(`${PantallaModeloService.name} NO PROPORCIONADO`);

        if ( !this.documentoEntradaEfectivoService ) throw new InternalServerErrorException(`${DocumentoEntradaEfectivoService.name} NO PROPORCIONADO`);
        if ( !this.documentoEntradaBienConsumoService ) throw new InternalServerErrorException(`${DocumentoEntradaBienConsumoService.name} NO PROPORCIONADO`);
        if ( !this.documentoSalidaEfectivoService ) throw new InternalServerErrorException(`${DocumentoSalidaEfectivoService.name} NO PROPORCIONADO`);
        if ( !this.documentoSalidaBienConsumoService ) throw new InternalServerErrorException(`${DocumentoSalidaBienConsumoService.name} NO PROPORCIONADO`);
    }

    async getRefModels( data: NotaVenta[] )
    {
        const recordUsuarios = await this.usuarioService.getRecordByUuids({
            body: {
                json: [ ...new Set(
                    data.flatMap( item => [
                        item.usuario?.uuid,
                        item.usuarioTecnico?.uuid,
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

        const recordAlmacenes = await this.almacenService.getRecordByUuids({
            body: {
                json: [ ...new Set(
                    data.flatMap( item => [
                        ...item.salidasBienConsumo.map( sal => sal.almacen?.uuid ),
                        ...item.salidasProduccionServicioReparacion.flatMap( sal => sal.recursosBienConsumo.map( recurso => recurso.almacen?.uuid ) ),
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
                        ...item.salidasBienConsumo.map( sal => sal.bienConsumo?.uuid ),
                        ...item.salidasProduccionServicioReparacion.flatMap( sal => sal.recursosBienConsumo.map( recurso => recurso.bienConsumo?.uuid ) ),
                        ...item.docsEntradaBienConsumo.flatMap( doc => doc.entradas.map( ent => ent.bienConsumo?.uuid ) ),
                        ...item.docsSalidaBienConsumo.flatMap( doc => doc.salidas.map( sal => sal.bienConsumo?.uuid ) ),
                    ] )
                ) ]
            }
        });

        const recordPantallasModelo = await this.pantallaModeloService.getRecordByUuids({
            body: {
                json: [ ...new Set(
                    data.flatMap( item => item.salidasProduccionServicioReparacion.map( sal => sal.pantallaModelo?.uuid ) )
                ) ]
            }
        })

        const recordServicios = await this.bienConsumoService.getRecordByUuids({
            body: {
                json: [ ...new Set(
                    data.flatMap( item => item.salidasProduccionServicioReparacion.map( sal => sal.servicio?.uuid ) )
                ) ]
            }
        })

        return {
            recordUsuarios,
            recordClientes,
            recordAlmacenes,
            recordBienesConsumo,
            recordPantallasModelo,
            recordServicios
        }
    }

    setRefModels( data: NotaVenta[], records: Awaited<ReturnType<NotaVentaService['getRefModels']>> )
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

            if ( item.usuarioTecnico?.uuid ) {
                item.set({
                    usuarioTecnico: records.recordUsuarios[item.usuarioTecnico.uuid]
                })
            }

            item.salidasBienConsumo.forEach( sal => {
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

            item.salidasProduccionServicioReparacion.forEach( sal => {
                if ( sal.servicio?.uuid ) {
                    sal.set({
                        servicio: records.recordServicios[sal.servicio.uuid]
                    })
                }

                if ( sal.pantallaModelo?.uuid ) {
                    sal.set({
                        pantallaModelo: records.recordPantallasModelo[sal.pantallaModelo.uuid]
                    })
                }

                sal.recursosBienConsumo.forEach( recurso => {
                    if ( recurso.almacen?.uuid ) {
                        recurso.set({
                            almacen: records.recordAlmacenes[recurso.almacen.uuid]
                        })
                    }

                    if ( recurso.bienConsumo?.uuid ) {
                        recurso.set({
                            bienConsumo: records.recordBienesConsumo[recurso.bienConsumo.uuid]
                        })
                    }
                } )
            } );
            
            
            this.documentoEntradaEfectivoService.setRefModels( item.docsEntradaEfectivo, records );
            this.documentoEntradaBienConsumoService.setRefModels( item.docsEntradaBienConsumo, records );
            this.documentoSalidaEfectivoService.setRefModels( item.docsSalidaEfectivo, records );
            this.documentoSalidaBienConsumoService.setRefModels( item.docsSalidaBienConsumo, records );
        } )


        return data;
    }

    async getCollection( config?: { complete?: boolean } )
    {
        const data = await this.conectorService.get<NotaVenta[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => new NotaVenta({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records);
    }

    async getCollectionByUsuarioId( config: { body: any, complete?: boolean } )
    {
        const data = await this.conectorService.post<NotaVenta[]>( this.getRoute('getCollectionByUsuarioId'), {
            data: config.body
        } )
        .then( data => data.map( item => new NotaVenta({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records )
            .sort( ( a, b ) => ( a.id ?? 0 ) - ( b.id ?? 0 ) );
    }

    async getCollectionByClienteId( config: { body: any, complete?: boolean } )
    {
        const data = await this.conectorService.post<NotaVenta[]>( this.getRoute('getCollectionByClienteId'), {
            data: config.body
        } )
        .then( data => data.map( item => new NotaVenta({ ...item })) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records )
            .sort( ( a, b ) => ( a.id ?? 0 ) - ( b.id ?? 0 ) );
    }

    async getObjectById( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<NotaVenta>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => new NotaVenta({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async create( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<NotaVenta>( this.getRoute('create'), {
            data: config.body
        } )
        .then( item => new NotaVenta({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async createAndIssue( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<NotaVenta>( this.getRoute('createAndIssue'), {
            data: config.body
        } )
        .then( item => new NotaVenta({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async update( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.put<NotaVenta>( this.getRoute('update'), {
            data: config.body
        } )
        .then( item => new NotaVenta({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async updateAndIssue( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.put<NotaVenta>( this.getRoute('updateAndIssue'), {
            data: config.body
        } )
        .then( item => new NotaVenta({ ...item }));

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records)[0];
    }

    async updateVoid( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.put<NotaVenta>( this.getRoute('updateVoid'), {
            data: config.body
        } )
        .then( item => new NotaVenta({ ...item }));

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