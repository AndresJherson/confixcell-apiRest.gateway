import { Injectable } from '@nestjs/common';
import { PersonaBaseService } from '../PersonaBaseService';
import { ConectorService } from 'src/services/conector.service';
import { Empresa } from '@confixcell/modelos';

@Injectable()
export class EmpresaService extends PersonaBaseService {
    constructor(
        private conectorService: ConectorService
    ) {
        super('empresa');
    }

    async getObject() {
        return await this.conectorService.get<Empresa>(this.getRoute('getObject'))
        .then(item => new Empresa({ ...item }));
    }

    async update(config: { body: any }) {
        return await this.conectorService.put<Empresa>(this.getRoute('update'), {
            data: config.body
        })
        .then(item => new Empresa({ ...item }));
    }
}