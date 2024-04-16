import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ISecretService } from 'libs/modules/global/secrets/adapter';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  const { PORT } = app.get(ISecretService);
  
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
    }),
  );
  
  app.setGlobalPrefix('api');
  await app.listen(PORT);
}
bootstrap();
