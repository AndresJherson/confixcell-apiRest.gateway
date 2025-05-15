import { Persona } from '@confixcell/modelos';
import { Injectable } from '@nestjs/common';
import { ConectorService } from 'src/services/conector.service';
import { PersonaBaseService } from './PersonaBaseService';

@Injectable()
export class PersonaService extends PersonaBaseService {
    constructor(
        private conectorService: ConectorService
    ) {
        super('persona');
    }

    async getCollection() {
        return await this.conectorService.get<Persona[]>(this.getRoute('getCollection'))
            .then(data => data.map( item => Persona.initialize([ item ])[0] ));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, Persona>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [ uuid, Persona.initialize([ item ])[0] ])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<Persona>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then( item => Persona.initialize([ item ])[0] );
    }
}