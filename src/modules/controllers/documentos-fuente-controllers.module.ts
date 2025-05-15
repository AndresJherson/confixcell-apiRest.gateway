import { Module } from '@nestjs/common';
import { DocumentoFuenteController } from 'src/controllers/documentos-fuente/documento-fuente.controller';
import { DocumentoMovimientoController } from 'src/controllers/documentos-fuente/documento-movimiento/documento-movimiento.controller';
import { DocumentoTransaccionController } from 'src/controllers/documentos-fuente/documento-transaccion/documento-transaccion.controller';
import { DocumentoEntradaEfectivoController } from 'src/controllers/documentos-fuente/documento-movimiento/entrada/documento-entrada-efectivo.controller';
import { DocumentoEntradaBienConsumoController } from 'src/controllers/documentos-fuente/documento-movimiento/entrada/documento-entrada-bien-consumo.controller';
import { DocumentoSalidaEfectivoController } from 'src/controllers/documentos-fuente/documento-movimiento/salida/documento-salida-efectivo.controller';
import { DocumentoSalidaBienConsumoController } from 'src/controllers/documentos-fuente/documento-movimiento/salida/documento-salida-bien-consumo.controller';
import { NotaVentaController } from 'src/controllers/documentos-fuente/documento-transaccion/nota-venta/nota-venta.controller';
import { NvCategoriaReparacionController } from 'src/controllers/documentos-fuente/documento-transaccion/nota-venta/nv-categoria-reparacion.controller';
import { NvEstadoController } from 'src/controllers/documentos-fuente/documento-transaccion/nota-venta/nv-estado.controller';
import { NvPrioridadController } from 'src/controllers/documentos-fuente/documento-transaccion/nota-venta/nv-prioridad.controller';
import { NotaTransaccionEntradaController } from 'src/controllers/documentos-fuente/documento-transaccion/nota-transaccion-entrada/nota-transaccion-entrada.controller';
import { ComprobanteTipoController } from 'src/controllers/documentos-fuente/documento-transaccion/nota-transaccion-entrada/comprobante-tipo.controller';
import { NotaTransaccionSalidaController } from 'src/controllers/documentos-fuente/documento-transaccion/nota-transaccion-salida/nota-transaccion-salida.controller';
import { MedioTransferenciaController } from 'src/controllers/documentos-fuente/medio-transferencia.controller';
import { NotaController } from 'src/controllers/documentos-fuente/nota/nota.controller';
import { LiquidacionTipoController } from 'src/controllers/documentos-fuente/liquidacion-tipo.controller';
import { RouterModule } from '@nestjs/core';
import { DocumentosFuenteRepositoriesModule } from '../repositories/documentos-fuente-repositories.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        RouterModule.register([
            {
                path: 'documentosFuente',
                module: DocumentosFuenteControllersModule
            }
        ]),
        DocumentosFuenteRepositoriesModule,
        AuthModule
    ],
    controllers: [
        DocumentoFuenteController,
        DocumentoMovimientoController,
        DocumentoTransaccionController,
        DocumentoEntradaEfectivoController,
        DocumentoEntradaBienConsumoController,
        DocumentoSalidaEfectivoController,
        DocumentoSalidaBienConsumoController,
        NotaVentaController,
        NvCategoriaReparacionController,
        NvEstadoController,
        NvPrioridadController,
        NotaTransaccionEntradaController,
        ComprobanteTipoController,
        NotaTransaccionSalidaController,
        MedioTransferenciaController,
        NotaController,
        LiquidacionTipoController
    ],
})
export class DocumentosFuenteControllersModule {}
