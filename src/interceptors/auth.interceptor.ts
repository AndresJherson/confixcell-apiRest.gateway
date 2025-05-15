import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { SessionData } from 'src/utils/interfaces';

@Injectable()
export class AuthInterceptor implements NestInterceptor {

    constructor(
        private authService: AuthService
    )
    {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any>
    {
        const ctx = context.switchToHttp();
        const req: Request = ctx.getRequest();
        const res = ctx.getResponse();

        return from( this.authService.verifyToken( req ) ).pipe(
            switchMap( ({ token, usuario }) => {

                const body = req.body;

                try {
                    req.body = {
                        usuarioSession: usuario,
                        ...body
                    }
                }
                catch ( error ) {
                    req.body = { usuarioSession: usuario }
                }

                return next.handle();
            } )
        )
    }
}
