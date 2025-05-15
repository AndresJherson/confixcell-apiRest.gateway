import { DocumentoEntradaBienConsumo, DocumentoEntradaEfectivo, DocumentoFuente, DocumentoMovimiento, DocumentoSalidaBienConsumo, DocumentoSalidaEfectivo } from '@confixcell/modelos';
import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { DocumentoFuenteBaseService } from '../DocumentoFuenteBaseService';
import { ModuleRef } from '@nestjs/core';
import { DocumentoEntradaEfectivoService } from './entrada/documento-entrada-efectivo.service';
import { DocumentoEntradaBienConsumoService } from './entrada/documento-entrada-bien-consumo.service';
import { DocumentoSalidaEfectivoService } from './salida/documento-salida-efectivo.service';
import { DocumentoSalidaBienConsumoService } from './salida/documento-salida-bien-consumo.service';

@Injectable()
export class DocumentoMovimientoService extends DocumentoFuenteBaseService implements OnModuleInit {

    private documentoEntradaEfectivoService!: DocumentoEntradaEfectivoService;
    private documentoEntradaBienConsumoService!: DocumentoEntradaBienConsumoService;
    private documentoSalidaEfectivoService!: DocumentoSalidaEfectivoService;
    private documentoSalidaBienConsumoService!: DocumentoSalidaBienConsumoService;

    constructor(
        private conectorService: ConectorService,
        private moduleRef: ModuleRef
    )
    {
        super('documentoMovimiento');
    }

    onModuleInit() 
    {
        this.documentoEntradaEfectivoService = this.moduleRef.get( DocumentoEntradaEfectivoService, { strict: false } );
        this.documentoEntradaBienConsumoService = this.moduleRef.get( DocumentoEntradaBienConsumoService, { strict: false } );
        this.documentoSalidaEfectivoService = this.moduleRef.get( DocumentoSalidaEfectivoService, { strict: false } );
        this.documentoSalidaBienConsumoService = this.moduleRef.get( DocumentoSalidaBienConsumoService, { strict: false } );
    
        if ( !this.documentoEntradaEfectivoService ) throw new InternalServerErrorException(`${DocumentoEntradaEfectivoService.name} NO PROPORCIONADO`);
        if ( !this.documentoEntradaBienConsumoService ) throw new InternalServerErrorException(`${DocumentoEntradaBienConsumoService.name} NO PROPORCIONADO`);
        if ( !this.documentoSalidaEfectivoService ) throw new InternalServerErrorException(`${DocumentoSalidaEfectivoService.name} NO PROPORCIONADO`);
        if ( !this.documentoSalidaBienConsumoService ) throw new InternalServerErrorException(`${DocumentoSalidaBienConsumoService.name} NO PROPORCIONADO`);
    }

    async getRefModels( data: DocumentoMovimiento[] )
    {
        const data1 = data.filter( item => item instanceof DocumentoEntradaEfectivo );
        const record1 = !data1.length ? undefined : await this.documentoEntradaEfectivoService.getRefModels( data1 );

        const data2 = data.filter( item => item instanceof DocumentoEntradaBienConsumo );
        const record2 = !data2.length ? undefined : await this.documentoEntradaBienConsumoService.getRefModels( data2 );

        const data3 = data.filter( item => item instanceof DocumentoSalidaEfectivo );
        const record3 = !data3.length ? undefined : await this.documentoSalidaEfectivoService.getRefModels( data3 );

        const data4 = data.filter( item => item instanceof DocumentoSalidaBienConsumo );
        const record4 = !data4.length ? undefined : await this.documentoSalidaBienConsumoService.getRefModels( data4 );

        return {
            recordUsuarios: {
                ...record1?.recordUsuarios,
                ...record2?.recordUsuarios,
                ...record3?.recordUsuarios,
                ...record4?.recordUsuarios
            },
            recordAlmacenes: {
                ...record2?.recordAlmacenes,
                ...record4?.recordAlmacenes,
            },
            recordBienesConsumo: {
                ...record2?.recordBienesConsumo,
                ...record4?.recordBienesConsumo,
            },
        }
    }

    setRefModels( data: DocumentoMovimiento[], records: Awaited<ReturnType<DocumentoMovimientoService['getRefModels']>> )
    {
        const data2send: DocumentoMovimiento[] = [];

        const data1 = data.filter( item => item instanceof DocumentoEntradaEfectivo );
        data2send.push( ...this.documentoEntradaEfectivoService.setRefModels( data1, records ) );

        const data2 = data.filter( item => item instanceof DocumentoEntradaBienConsumo );
        data2send.push( ...this.documentoEntradaBienConsumoService.setRefModels( data2, records ) );

        const data3 = data.filter( item => item instanceof DocumentoSalidaEfectivo );
        data2send.push( ...this.documentoSalidaEfectivoService.setRefModels( data3, records ) );

        const data4 = data.filter( item => item instanceof DocumentoSalidaBienConsumo );
        data2send.push( ...this.documentoSalidaBienConsumoService.setRefModels( data4, records ) );

        return data2send;
    }

    async getCollection( config?: { complete?: boolean } )
    {
        const data = await this.conectorService.get<DocumentoMovimiento[]>( this.getRoute('getCollection') )
        .then( data => data.map( item => DocumentoMovimiento.initialize([ item ])[0] ) );

        if ( !config?.complete ) return data;
        const records = await this.getRefModels( data );
        return this.setRefModels( data, records )
            .sort( ( a, b ) => ( a.id ?? 0 ) - ( b.id ?? 0 ) );
    }

    async getObjectById( config: { body: any, complete?: boolean } )
    {
        const item = await this.conectorService.post<DocumentoMovimiento>( this.getRoute('getObjectById'), {
            data: config.body
        } )
        .then( item => DocumentoMovimiento.initialize([ item ])[0] );

        if ( !config.complete ) return item;
        const records = await this.getRefModels([ item ]);
        return this.setRefModels([ item ], records )[0]
    }
}