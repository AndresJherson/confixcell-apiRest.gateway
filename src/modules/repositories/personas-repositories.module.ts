import { Module } from '@nestjs/common';
import { ClienteJuridicoService } from 'src/repositories/personas/cliente/cliente-juridico.service';
import { ClienteNaturalService } from 'src/repositories/personas/cliente/cliente-natural.service';
import { ClienteService } from 'src/repositories/personas/cliente/cliente.service';
import { DocumentoIdentificacionService } from 'src/repositories/personas/documento-identificacion.service';
import { GeneroService } from 'src/repositories/personas/genero.service';
import { PersonaService } from 'src/repositories/personas/persona.service';
import { ProveedorJuridicoService } from 'src/repositories/personas/proveedor/proveedor-juridico.service';
import { ProveedorNaturalService } from 'src/repositories/personas/proveedor/proveedor-natural.service';
import { ProveedorService } from 'src/repositories/personas/proveedor/proveedor.service';
import { UsuarioService } from 'src/repositories/personas/usuario/usuario.service';
import { ServicesModule } from '../services/services.module';
import { EmpresaService } from 'src/repositories/personas/empresa/empresa.service';
import { PoliticaComercialService } from 'src/repositories/personas/empresa/politica-comercial.service';

@Module({
    imports: [
        ServicesModule
    ],
    providers: [
        PersonaService,
        DocumentoIdentificacionService,
        GeneroService,
        ClienteService,
        ClienteNaturalService,
        ClienteJuridicoService,
        ProveedorService,
        ProveedorNaturalService,
        ProveedorJuridicoService,
        UsuarioService,
        EmpresaService,
        PoliticaComercialService
    ],
    exports: [
        PersonaService,
        DocumentoIdentificacionService,
        GeneroService,
        ClienteService,
        ClienteNaturalService,
        ClienteJuridicoService,
        ProveedorService,
        ProveedorNaturalService,
        ProveedorJuridicoService,
        UsuarioService,
        EmpresaService,
        PoliticaComercialService
    ]
})
export class PersonasRepositoriesModule {}
