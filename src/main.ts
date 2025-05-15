import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const corsOptions: CorsOptions = {
        origin: true,
        credentials: true,
        preflightContinue: false,
    }
    app.enableCors( corsOptions );

    const config = new DocumentBuilder()
        .setTitle('API Gateway')
        .setVersion('1.0')
        .addBearerAuth({
            type: 'http'
        })
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, documentFactory);

    app.useGlobalFilters( new AllExceptionFilter() );

    const port = process.env.PORT ?? 3000;

    await app.listen(port);

    Logger.log(`Listen on ${await app.getUrl()}`)
}
bootstrap();
