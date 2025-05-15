import { Module } from '@nestjs/common';
import { AlmacenService } from 'src/repositories/recursos/bien/bien-capital/almacen.service';
import { BienCapitalService } from 'src/repositories/recursos/bien/bien-capital/bien-capital.service';
import { BienConsumoService } from 'src/repositories/recursos/bien/bien-consumo/bien-consumo.service';
import { CalidadService } from 'src/repositories/recursos/bien/bien-consumo/pantalla/calidad.service';
import { PantallaMarcaService } from 'src/repositories/recursos/bien/bien-consumo/pantalla/pantalla-marca.service';
import { PantallaModeloCalidadService } from 'src/repositories/recursos/bien/bien-consumo/pantalla/pantalla-modelo-calidad.service';
import { PantallaModeloService } from 'src/repositories/recursos/bien/bien-consumo/pantalla/pantalla-modelo.service';
import { MagnitudService } from 'src/repositories/recursos/bien/bien-consumo/producto/magnitud.service';
import { ProductoCategoriaService } from 'src/repositories/recursos/bien/bien-consumo/producto/producto-categoria.service';
import { ProductoMarcaService } from 'src/repositories/recursos/bien/bien-consumo/producto/producto-marca.service';
import { ProductoService } from 'src/repositories/recursos/bien/bien-consumo/producto/producto.service';
import { BienService } from 'src/repositories/recursos/bien/bien.service';
import { RecursoService } from 'src/repositories/recursos/recurso.service';
import { ServicioCategoriaService } from 'src/repositories/recursos/servicio/servicio-categoria.service';
import { ServicioService } from 'src/repositories/recursos/servicio/servicio.service';
import { ServicesModule } from '../services/services.module';

@Module({
    imports: [
        ServicesModule
    ],
    providers: [
        RecursoService,
        ServicioService, 
        ServicioCategoriaService,
        BienService,
        BienCapitalService,
        AlmacenService,
        BienConsumoService,
        ProductoService,
        ProductoCategoriaService,
        ProductoMarcaService,
        MagnitudService,
        PantallaModeloCalidadService,
        PantallaModeloService,
        CalidadService,
        PantallaMarcaService
    ],
    exports: [
        RecursoService,
        ServicioService, 
        ServicioCategoriaService, 
        BienService, 
        BienCapitalService, 
        AlmacenService, 
        BienConsumoService, 
        ProductoService, 
        ProductoCategoriaService, 
        ProductoMarcaService, 
        MagnitudService, 
        PantallaModeloCalidadService, 
        PantallaModeloService, 
        CalidadService, 
        PantallaMarcaService
    ]
})
export class RecursosRepositoriesModule {}
