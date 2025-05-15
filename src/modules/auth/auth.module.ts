import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { PersonasRepositoriesModule } from '../repositories/personas-repositories.module';
import { ServicesModule } from '../services/services.module';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';

@Module({
    imports: [
        PersonasRepositoriesModule,
        ServicesModule
    ],
    providers: [
        AuthService,
        AuthInterceptor
    ],
    exports: [
        AuthService,
        AuthInterceptor
    ]
})
export class AuthModule {}
