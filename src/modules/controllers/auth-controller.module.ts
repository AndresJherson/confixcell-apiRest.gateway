import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        AuthModule
    ],
    controllers: [
        AuthController
    ]
})
export class AuthControllerModule {}
