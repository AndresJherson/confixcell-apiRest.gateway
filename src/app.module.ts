import { Module } from '@nestjs/common';
import { AuthControllerModule } from './modules/controllers/auth-controller.module';
import { DocumentosFuenteControllersModule } from './modules/controllers/documentos-fuente-controllers.module';
import { PersonasControllersModule } from './modules/controllers/personas-controllers.module';
import { RecursosControllersModule } from './modules/controllers/recursos-controllers.module';

@Module({
    imports: [
        AuthControllerModule,
        DocumentosFuenteControllersModule,
        PersonasControllersModule,
        RecursosControllersModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
