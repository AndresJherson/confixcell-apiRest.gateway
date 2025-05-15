export abstract class DocumentoFuenteBaseService
{
    protected baseUrl = process.env.HOST_DOCUMENTOS_FUENTE;
    protected entityRoute = '';


    constructor( entityRoute: string )
    {
        this.entityRoute = entityRoute;
    }

    protected getRoute( route?: string )
    {
        return `${this.baseUrl}/${this.entityRoute}${(  route ? `/${route}` : '' )}`
    }
}