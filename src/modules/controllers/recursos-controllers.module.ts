import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RecursosRepositoriesModule } from '../repositories/recursos-repositories.module';
import { RecursoController } from 'src/controllers/recursos/recurso.controller';
import { ServicioController } from 'src/controllers/recursos/servicio/servicio.controller';
import { ServicioCategoriaController } from 'src/controllers/recursos/servicio/servicio-categoria.controller';
import { BienController } from 'src/controllers/recursos/bien/bien.controller';
import { BienCapitalController } from 'src/controllers/recursos/bien/bien-capital/bien-capital.controller';
import { AlmacenController } from 'src/controllers/recursos/bien/bien-capital/almacen.controller';
import { BienConsumoController } from 'src/controllers/recursos/bien/bien-consumo/bien-consumo.controller';
import { ProductoController } from 'src/controllers/recursos/bien/bien-consumo/producto/producto.controller';
import { ProductoCategoriaController } from 'src/controllers/recursos/bien/bien-consumo/producto/producto-categoria.controller';
import { ProductoMarcaController } from 'src/controllers/recursos/bien/bien-consumo/producto/producto-marca.controller';
import { MagnitudController } from 'src/controllers/recursos/bien/bien-consumo/producto/magnitud.controller';
import { PantallaModeloCalidadController } from 'src/controllers/recursos/bien/bien-consumo/pantalla/pantalla-modelo-calidad.controller';
import { PantallaModeloController } from 'src/controllers/recursos/bien/bien-consumo/pantalla/pantalla-modelo.controller';
import { CalidadController } from 'src/controllers/recursos/bien/bien-consumo/pantalla/calidad.controller';
import { PantallaMarcaController } from 'src/controllers/recursos/bien/bien-consumo/pantalla/pantalla-marca.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        RouterModule.register([
            {
                path: 'recursos',
                module: RecursosControllersModule
            }
        ]),
        RecursosRepositoriesModule,
        AuthModule
    ],
    controllers: [
        RecursoController,
        ServicioController, 
        ServicioCategoriaController,
        BienController,
        BienCapitalController,
        AlmacenController,
        BienConsumoController,
        ProductoController,
        ProductoCategoriaController,
        ProductoMarcaController,
        MagnitudController,
        PantallaModeloCalidadController,
        PantallaModeloController,
        CalidadController,
        PantallaMarcaController
    ],
})
export class RecursosControllersModule {}
