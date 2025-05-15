import { Usuario } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PersonaBaseService } from '../PersonaBaseService';

@Injectable()
export class UsuarioService extends PersonaBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('usuario');
    }

    async getCollection() {
        return await this.conectorService.get<Usuario[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => new Usuario({ ...item })));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, Usuario>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, new Usuario({ ...item })])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<Usuario>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => new Usuario({ ...item }));
    }
    
    async getObjectByCredentials(config: { body: any }) {
        return await this.conectorService.post<Usuario>(this.getRoute('getObjectByCredentials'), {
            data: config.body
        })
        .then(item => new Usuario({ ...item }));
    }

    async create(config: { body: any }) {
        return await this.conectorService.post<Usuario>(this.getRoute('create'), {
            data: config.body
        })
        .then(item => new Usuario({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<Usuario>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new Usuario({ ...item }));
    }

    async selfUpdate(config: { body: any }) {
        return await this.conectorService.put<Usuario>(this.getRoute('selfUpdate'), {
            data: config.body
        })
        .then(item => new Usuario({ ...item }));
    }

    async updateContrasena(config: { body: any }) {
        return await this.conectorService.put<Usuario>(this.getRoute('updateContrasena'), {
            data: config.body
        })
        .then(item => new Usuario({ ...item }));
    }

    async selfUpdateContrasena(config: { body: any }) {
        return await this.conectorService.put<Usuario>(this.getRoute('selfUpdateContrasena'), {
            data: config.body
        })
        .then(item => new Usuario({ ...item }));
    }

    async delete(config: { body: any }) {
        return await this.conectorService.delete(this.getRoute('delete'), {
            data: config.body
        });
    }
}