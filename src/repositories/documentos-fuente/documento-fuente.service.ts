import { DocumentoFuente, DocumentoMovimiento, DocumentoTransaccion } from '@confixcell/modelos';
import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from './DocumentoFuenteBaseService';
import { DocumentoTransaccionService } from './documento-transaccion/documento-transaccion.service';
import { DocumentoMovimientoService } from './documento-movimiento/documento-movimiento.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class DocumentoFuenteService extends DocumentoFuenteBaseService implements OnModuleInit {

    private documentoTransaccionService!: DocumentoTransaccionService;
    private documentoMovimientoService!: DocumentoMovimientoService;

    constructor(
        private conectorService: ConectorService,
        private moduleRef: ModuleRef
    )
    {
        super('documentoFuente');
    }

    onModuleInit() 
    {
        this.documentoTransaccionService = this.moduleRef.get( DocumentoTransaccionService, { strict: false } );
        this.documentoMovimientoService = this.moduleRef.get( DocumentoMovimientoService, { strict: false } );
    
        if ( !this.documentoTransaccionService ) throw new InternalServerErrorException(`${DocumentoTransaccionService.name} NO PROPORCIONADO`);
        if ( !this.documentoMovimientoService ) throw new InternalServerErrorException(`${DocumentoMovimientoService.name} NO PROPORCIONADO`);
    }

    async getRefModels( data: DocumentoFuente[] )
    {
        const data1 = data.filter( item => item instanceof DocumentoTransaccion );
        const record1 = !data1.length ? undefined : await this.documentoTransaccionService.getRefModels( data1 );

        const data2 = data.filter( item => item instanceof DocumentoMovimiento );
        const record2 = !data2.length ? undefined : await this.documentoMovimientoService.getRefModels( data2 );

        return {
            recordUsuarios: {
                ...record1?.recordUsuarios,
                ...record2?.recordUsuarios,
            },
            recordProveedores: {
                ...record1?.recordProveedores
            },
            recordDocumentosIdentificacion: {
                ...record1?.recordDocumentosIdentificacion
            },
            recordRecursos: {
                ...record1?.recordRecursos,
            },
            recordAlmacenes: {
                ...record1?.recordAlmacenes,
                ...record2?.recordAlmacenes,
            },
            recordBienesConsumo: {
                ...record1?.recordBienesConsumo,
                ...record2?.recordBienesConsumo,
            },
            recordClientes: {
                ...record1?.recordClientes,
            },
            recordPantallasModelo: {
                ...record1?.recordPantallasModelo
            },
            recordServicios: {
                ...record1?.recordServicios
            }
        }
    }

    setRefModels( data: DocumentoFuente[], records: Awaited<ReturnType<DocumentoFuenteService['getRefModels']>> )
    {
        const data2send: DocumentoFuente[] = [];

        const data1 = data.filter( item => item instanceof DocumentoTransaccion );
        data2send.push( ...this.documentoTransaccionService.setRefModels( data1, records ) );

        const data2 = data.filter( item => item instanceof DocumentoMovimiento );
        data2send.push( ...this.documentoMovimientoService.setRefModels( data2, records ) );

        return data2send;
    }

    async getCollection( config?: { complete?: boolean } )
    {
        const data2send: DocumentoFuente[] = [];

        const data = await this.conectorService.get<DocumentoFuente[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => DocumentoFuente.initialize([ item ])[0] ) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records )
            .sort( ( a, b ) => ( a.id ?? 0 ) - ( b.id ?? 0 ) );
    }

    async getObjectById( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<DocumentoFuente>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => DocumentoFuente.initialize([ item ])[0] );

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records )[0]
    }
}