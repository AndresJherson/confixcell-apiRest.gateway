export abstract class RecursoBaseService
{
    protected baseUrl = process.env.HOST_RECURSOS;
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