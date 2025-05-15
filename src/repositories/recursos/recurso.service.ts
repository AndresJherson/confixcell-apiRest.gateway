import { Injectable } from "@nestjs/common";
import { RecursoBaseService } from "./RecursoBaseService";
import { ConectorService } from "src/services/conector.service";
import { Recurso } from "@confixcell/modelos";

@Injectable()
export class RecursoService extends RecursoBaseService {
    
    constructor(
        private conectorService: ConectorService
    ) {
        super('recurso');
    }

    async getCollection() {
        return await this.conectorService.get<Recurso[]>(this.getRoute('getCollection'))
            .then(data => data.map(item => Recurso.initialize([ item ])[0] ));
    }

    async getRecordByUuids(config: { body: any }) {
        return await this.conectorService.post<Record<string, Recurso>>(this.getRoute('getRecordByUuids'), {
            data: config.body
        })
        .then(data => Object.fromEntries(Object.entries(data).map(([uuid, item]) => [uuid, Recurso.initialize([ item ])[0] ])));
    }

    async getObjectById(config: { body: any }) {
        return await this.conectorService.post<Recurso>(this.getRoute('getObjectById'), {
            data: config.body
        })
        .then(item => Recurso.initialize([ item ])[0] );
    }
}