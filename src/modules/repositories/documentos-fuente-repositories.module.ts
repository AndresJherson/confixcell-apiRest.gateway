import { Module } from '@nestjs/common';
import { DocumentoFuenteService } from 'src/repositories/documentos-fuente/documento-fuente.service';
import { DocumentoMovimientoService } from 'src/repositories/documentos-fuente/documento-movimiento/documento-movimiento.service';
import { DocumentoEntradaBienConsumoService } from 'src/repositories/documentos-fuente/documento-movimiento/entrada/documento-entrada-bien-consumo.service';
import { DocumentoEntradaEfectivoService } from 'src/repositories/documentos-fuente/documento-movimiento/entrada/documento-entrada-efectivo.service';
import { DocumentoSalidaBienConsumoService } from 'src/repositories/documentos-fuente/documento-movimiento/salida/documento-salida-bien-consumo.service';
import { DocumentoSalidaEfectivoService } from 'src/repositories/documentos-fuente/documento-movimiento/salida/documento-salida-efectivo.service';
import { DocumentoTransaccionService } from 'src/repositories/documentos-fuente/documento-transaccion/documento-transaccion.service';
import { ComprobanteTipoService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-transaccion-entrada/comprobante-tipo.service';
import { NotaTransaccionEntradaService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-transaccion-entrada/nota-transaccion-entrada.service';
import { NotaTransaccionSalidaService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-transaccion-salida/nota-transaccion-salida.service';
import { NotaVentaService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-venta/nota-venta.service';
import { NvCategoriaReparacionService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-venta/nv-categoria-reparacion.service';
import { NvEstadoService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-venta/nv-estado.service';
import { NvPrioridadService } from 'src/repositories/documentos-fuente/documento-transaccion/nota-venta/nv-prioridad.service';
import { LiquidacionTipoService } from 'src/repositories/documentos-fuente/liquidacion-tipo.service';
import { MedioTransferenciaService } from 'src/repositories/documentos-fuente/medio-transferencia.service';
import { NotaService } from 'src/repositories/documentos-fuente/nota/nota.service';
import { ServicesModule } from '../services/services.module';

@Module({
    imports: [
        ServicesModule
    ],
    providers: [
        DocumentoFuenteService,
        DocumentoMovimientoService,
        DocumentoTransaccionService,
        DocumentoEntradaEfectivoService,
        DocumentoEntradaBienConsumoService,
        DocumentoSalidaEfectivoService,
        DocumentoSalidaBienConsumoService,
        NotaVentaService,
        NvCategoriaReparacionService,
        NvEstadoService,
        NvPrioridadService,
        NotaTransaccionEntradaService,
        ComprobanteTipoService,
        NotaTransaccionSalidaService,
        MedioTransferenciaService,
        NotaService,
        LiquidacionTipoService
    ],
    exports: [
        DocumentoFuenteService, 
        DocumentoMovimientoService, 
        DocumentoTransaccionService, 
        DocumentoEntradaEfectivoService, 
        DocumentoEntradaBienConsumoService, 
        DocumentoSalidaEfectivoService, 
        DocumentoSalidaBienConsumoService, 
        NotaVentaService, 
        NvCategoriaReparacionService, 
        NvEstadoService, 
        NvPrioridadService, 
        NotaTransaccionEntradaService, 
        ComprobanteTipoService, 
        NotaTransaccionSalidaService, 
        MedioTransferenciaService, 
        NotaService, 
        LiquidacionTipoService
    ]
})
export class DocumentosFuenteRepositoriesModule {}
