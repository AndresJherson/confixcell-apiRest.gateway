export abstract class PersonaBaseService
{
    protected baseUrl = process.env.HOST_PERSONAS;
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