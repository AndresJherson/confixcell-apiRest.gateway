import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';

@Injectable()
export class ConectorService {

    constructor(
        private httpService: HttpService
    )
    {}


    async get<T>( url: string, config?: AxiosRequestConfig ): Promise<T>
    {
        return await firstValueFrom( this.httpService.get( url, config).pipe(
            map( res => res.data ),
            catchError( (error: AxiosError) => {
                const errorResponse = error.response?.data as { statusCode: number, message: string } | undefined;
                return throwError( () => new HttpException( 
                    errorResponse ? errorResponse : {
                        statusCode: 500,
                        message: 'Error en petición GET'
                    }, 
                    errorResponse?.statusCode ?? 500 
                ) )
            } )
        ) )
    }


    async post<T>( url: string, config?: AxiosRequestConfig ): Promise<T>
    {
        return await firstValueFrom( this.httpService.post( url, config?.data, config ).pipe(
            map( res => res.data ),
            catchError( (error: AxiosError) => {
                const errorResponse = error.response?.data as { statusCode: number, message: string } | undefined;
                return throwError( () => new HttpException( 
                    errorResponse ? errorResponse : {
                        statusCode: 500,
                        message: 'Error en petición POST'
                    }, 
                    errorResponse?.statusCode ?? 500 
                ) )
            } )
        ) )
    }


    async put<T>( url: string, config?: AxiosRequestConfig ): Promise<T>
    {
        return await firstValueFrom( this.httpService.put( url, config?.data, config ).pipe(
            map( res => res.data ),
            catchError( (error: AxiosError) => {
                const errorResponse = error.response?.data as { statusCode: number, message: string } | undefined;
                return throwError( () => new HttpException( 
                    errorResponse ? errorResponse : {
                        statusCode: 500,
                        message: 'Error en petición PUT'
                    }, 
                    errorResponse?.statusCode ?? 500 
                ) )
            } )            
        ) )
    }


    async delete<T>( url: string, config?: AxiosRequestConfig ): Promise<T>
    {
        return await firstValueFrom( this.httpService.delete( url, config ).pipe(
            map( res => res.data ),
            catchError( (error: AxiosError) => {
                const errorResponse = error.response?.data as { statusCode: number, message: string } | undefined;
                return throwError( () => new HttpException( 
                    errorResponse ? errorResponse : {
                        statusCode: 500,
                        message: 'Error en petición DELETE'
                    }, 
                    errorResponse?.statusCode ?? 500 
                ) )
            } )
        ) )
    }
}
