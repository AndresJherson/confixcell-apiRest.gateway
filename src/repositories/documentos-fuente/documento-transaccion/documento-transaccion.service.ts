import { DocumentoTransaccion, NotaTransaccionEntrada, NotaTransaccionSalida, NotaVenta } from '@confixcell/modelos';
import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../DocumentoFuenteBaseService';
import { NotaTransaccionEntradaService } from './nota-transaccion-entrada/nota-transaccion-entrada.service';
import { NotaVentaService } from './nota-venta/nota-venta.service';
import { NotaTransaccionSalidaService } from './nota-transaccion-salida/nota-transaccion-salida.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class DocumentoTransaccionService extends DocumentoFuenteBaseService implements OnModuleInit {

    private notaTransaccionEntradaService!: NotaTransaccionEntradaService;
    private notaTransaccionSalidaService!: NotaTransaccionSalidaService;
    private notaVentaService!: NotaVentaService;

    constructor(
        private conectorService: ConectorService,
        private moduleRef: ModuleRef
    )
    {
        super('documentoTransaccion');
    }

    onModuleInit() 
    {
        this.notaTransaccionEntradaService = this.moduleRef.get( NotaTransaccionEntradaService, { strict: false } );
        this.notaTransaccionSalidaService = this.moduleRef.get( NotaTransaccionSalidaService, { strict: false } );
        this.notaVentaService = this.moduleRef.get( NotaVentaService, { strict: false } );
    
        if ( !this.notaTransaccionEntradaService ) throw new InternalServerErrorException(`${NotaTransaccionEntradaService.name} NO PROPORCIONADO`);
        if ( !this.notaTransaccionSalidaService ) throw new InternalServerErrorException(`${NotaTransaccionSalidaService.name} NO PROPORCIONADO`);
        if ( !this.notaVentaService ) throw new InternalServerErrorException(`${NotaVentaService.name} NO PROPORCIONADO`);
    }

    async getRefModels( data: DocumentoTransaccion[] )
    {
        const data1 = data.filter( item => item instanceof NotaTransaccionEntrada );
        const record1 = !data1.length ? undefined : await this.notaTransaccionEntradaService.getRefModels( data1 );

        const data2 = data.filter( item => item instanceof NotaTransaccionSalida );
        const record2 = !data2.length ? undefined : await this.notaTransaccionSalidaService.getRefModels( data2 );

        const data3 = data.filter( item => item instanceof NotaVenta );
        const record3 = !data3.length ? undefined : await this.notaVentaService.getRefModels( data3 );

        return {
            recordUsuarios: {
                ...record1?.recordUsuarios,
                ...record2?.recordUsuarios,
                ...record3?.recordUsuarios,
            },
            recordProveedores: {
                ...record1?.recordProveedores
            },
            recordDocumentosIdentificacion: {
                ...record1?.recordDocumentosIdentificacion,
                ...record2?.recordDocumentosIdentificacion
            },
            recordRecursos: {
                ...record1?.recordRecursos,
                ...record2?.recordRecursos,
            },
            recordAlmacenes: {
                ...record1?.recordAlmacenes,
                ...record2?.recordAlmacenes,
                ...record3?.recordAlmacenes,
            },
            recordBienesConsumo: {
                ...record1?.recordBienesConsumo,
                ...record2?.recordBienesConsumo,
                ...record3?.recordBienesConsumo,
            },
            recordClientes: {
                ...record2?.recordClientes,
                ...record3?.recordClientes
            },
            recordPantallasModelo: {
                ...record3?.recordPantallasModelo
            },
            recordServicios: {
                ...record3?.recordServicios
            }
        }
    }

    setRefModels( data: DocumentoTransaccion[], records: Awaited<ReturnType<DocumentoTransaccionService['getRefModels']>> )
    {
        const data2send: DocumentoTransaccion[] = [];

        const data1 = data.filter( item => item instanceof NotaTransaccionEntrada );
        data2send.push( ...this.notaTransaccionEntradaService.setRefModels( data1, records ) );

        const data2 = data.filter( item => item instanceof NotaTransaccionSalida );
        data2send.push( ...this.notaTransaccionSalidaService.setRefModels( data2, records ) );

        const data3 = data.filter( item => item instanceof NotaVenta );
        data2send.push( ...this.notaVentaService.setRefModels( data3, records ) );

        return data2send;
    }

    async getCollection( config?: { complete?: boolean } )
    {
        const data = await this.conectorService.get<DocumentoTransaccion[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => DocumentoTransaccion.initialize([ item ])[0] ) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records )
            .sort( ( a, b ) => ( a.id ?? 0 ) - ( b.id ?? 0 ) );
    }


    async getCollectionByUsuarioId( config: { body: any, complete?: boolean } )
    {
        const data = await this.conectorService.post<DocumentoTransaccion[]>( this.getRoute('getCollectionByUsuarioId'), {
            data: config.body
        } )
        .then( data => data.map( item => DocumentoTransaccion.initialize([ item ])[0] ) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records )
            .sort( ( a, b ) => ( a.id ?? 0 ) - ( b.id ?? 0 ) );
    }


    async getCollectionByClienteId( config: { body: any, complete?: boolean } )
    {
        const data = await this.conectorService.post<DocumentoTransaccion[]>( this.getRoute('getCollectionByClienteId'), {
            data: config.body
        } )
        .then( data => data.map( item => DocumentoTransaccion.initialize([ item ])[0] ) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records )
            .sort( ( a, b ) => ( a.id ?? 0 ) - ( b.id ?? 0 ) );
    }


    async getCollectionByProveedorId( config: { body: any, complete?: boolean } )
    {
        const data = await this.conectorService.post<DocumentoTransaccion[]>( this.getRoute('getCollectionByProveedorId'), {
            data: config.body
        } )
        .then( data => data.map( item => DocumentoTransaccion.initialize([ item ])[0] ) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records )
            .sort( ( a, b ) => ( a.id ?? 0 ) - ( b.id ?? 0 ) );
    }


    async getObjectById( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<DocumentoTransaccion>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => DocumentoTransaccion.initialize([ item ])[0] );

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels( [ item ], records )[0]
    }
}