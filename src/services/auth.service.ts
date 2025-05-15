import { Usuario } from '@confixcell/modelos';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsuarioService } from 'src/repositories/personas/usuario/usuario.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private usuarioService: UsuarioService,
    ) { }


    async login( body: any )
    {
        try {
            const item = await this.usuarioService.getObjectByCredentials({ body });
            return this.setToken( item );
        } catch (error) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }
    }

    async verifyToken( req: Request ) 
    {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new UnauthorizedException('Token no proporcionado o formato incorrecto');
            }
    
            const token = authHeader.split(' ')[1];
            if (!token) throw new UnauthorizedException('Token vacío');
    
            const payload = this.jwtService.verify(token);
            const usuario = await this.usuarioService.getObjectById({ body: { json: new Usuario(payload) } });
            if ( !usuario.esActivo ) throw new UnauthorizedException('Usuario no activo');

            return this.refreshToken( token, usuario );
    
        } catch (error) {
            console.log( error );
            throw new UnauthorizedException('Token inválido o expirado');
        }
    }


    private setToken( usuario: Usuario)
    {
        const { contrasena, ...payload } = usuario;
        const token = this.jwtService.sign( payload );
        return {
            usuario: new Usuario({ ...payload }),
            token
        };
    }


    private refreshToken( oldToken: string, usuario: Usuario )
    {
        const decoded = this.jwtService.decode( oldToken ) as { exp: number, [key: string]: any };
        if ( !decoded || !decoded.exp ) throw new InternalServerErrorException('Token inválido');

        const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos
        const remainingSeconds = decoded.exp - now;
        if ( remainingSeconds <= 0 ) throw new UnauthorizedException('Token expirado');

        const { contrasena, ...payload } = usuario;
        const token = this.jwtService.sign( payload, {
            expiresIn: remainingSeconds
        } );

        return {
            usuario: new Usuario({ ...payload }),
            token
        };
    }
}