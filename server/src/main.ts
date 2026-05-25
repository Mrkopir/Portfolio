import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from "helmet";
import {ConfigService} from "@nestjs/config";
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { json, urlencoded } from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const clientUrl = configService.get<string>('CLIENT_URL');
    app.enableCors({
        origin: clientUrl,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false,
    });
    app.useGlobalFilters(new HttpExceptionFilter(configService));
    app.setGlobalPrefix('api');
    app.use(json({ limit: '20kb' }));
    app.use(urlencoded({ extended: true, limit: '20kb' }));

    app.useGlobalPipes(
        new ValidationPipe({
              whitelist: true,
              forbidNonWhitelisted: true,
              transform: true,
        }),
    );

    app.getHttpAdapter().getInstance().set('trust proxy', 1);

    app.use(helmet())

    const port = process.env.PORT || 5000;
    await app.listen(port, '0.0.0.0');
}

bootstrap();