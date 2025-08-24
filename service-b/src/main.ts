import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = await createSwagger(app);
  SwaggerModule.setup('api-docs', app, swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}

function createSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Service B APIs')
    .setDescription('API documentation for Service B app')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  return SwaggerModule.createDocument(app, swaggerConfig);
}
bootstrap();
