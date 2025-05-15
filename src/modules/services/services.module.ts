import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConectorService } from 'src/services/conector.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        HttpModule.register({
            timeout: 10000
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_KEY,
            signOptions: { expiresIn: '1d' }
        })
    ],
    providers: [
        ConectorService
    ],
    exports: [
        ConectorService,
        ConfigModule,
        HttpModule,
        JwtModule
    ]
})
export class ServicesModule {}
