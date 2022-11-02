import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as RedisStore from 'connect-redis';
import Redis from 'ioredis';



/**
 * @description 
 */
async function bootstrap() {
  const redis = new Redis();
  console.log(redis)
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      store: new RedisStore({ client: redis}),
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    })
    ),
    await app.listen(3000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true
    }),
  );
}
bootstrap();
