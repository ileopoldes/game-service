import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    const config = new DocumentBuilder()
      .setTitle('Ultra - game data service')
      .setDescription('REST API with CRUD operations')
      .setVersion('1.0')
      .addTag('games')
      .addTag('publisher')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
  } catch (error) {
    Logger.error({ err: error });
    process.exit();
  }
}
bootstrap();
