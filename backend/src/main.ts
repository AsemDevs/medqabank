import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const jwtSecret = configService.get<string>('JWT_SECRET');
  console.log('Loaded JWT_SECRET:', jwtSecret); // Verify the secret is loaded correctly

  app.enableCors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'], // Allow Authorization header
  });

  await app.listen(3001);
}
bootstrap();
