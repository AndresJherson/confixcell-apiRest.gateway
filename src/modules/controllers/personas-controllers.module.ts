import { Module } from '@nestjs/common';
import { ClienteJuridicoController } from 'src/controllers/personas/cliente/cliente-juridico.controller';
import { ClienteNaturalController } from 'src/controllers/personas/cliente/cliente-natural.controller';
import { ClienteController } from 'src/controllers/personas/cliente/cliente.controller';
import { DocumentoIdentificacionController } from 'src/controllers/personas/documento-identificacion.controller';
import { GeneroController } from 'src/controllers/personas/genero.controller';
import { PersonaController } from 'src/controllers/personas/persona.controller';
import { ProveedorJuridicoController } from 'src/controllers/personas/proveedor/proveedor-juridico.controller';
import { ProveedorNaturalController } from 'src/controllers/personas/proveedor/proveedor-natural.controller';
import { ProveedorController } from 'src/controllers/personas/proveedor/proveedor.controller';
import { UsuarioController } from 'src/controllers/personas/usuario/usuario.controller';
import { PersonasRepositoriesModule } from '../repositories/personas-repositories.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { EmpresaController } from 'src/controllers/personas/empresa/empresa.controller';
import { PoliticaComercialController } from 'src/controllers/personas/empresa/politica-comercial.controller';

@Module({
    imports: [
        RouterModule.register([
            {
                path: 'personas',
                module: PersonasControllersModule
            }
        ]),
        PersonasRepositoriesModule,
        AuthModule
    ],
    controllers: [
        PersonaController,
        DocumentoIdentificacionController,
        GeneroController,
        ClienteController,
        ClienteNaturalController,
        ClienteJuridicoController,
        ProveedorController,
        ProveedorNaturalController,
        ProveedorJuridicoController,
        UsuarioController,
        EmpresaController,
        PoliticaComercialController
    ],
})
export class PersonasControllersModule {}
