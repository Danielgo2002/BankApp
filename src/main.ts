import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as RedisStore from 'connect-redis';
import redis  from 'redis';



/**
 * @description 
 */
async function bootstrap() {
  let redisClient = redis.createClient({ port: 6379, host: 'localhost' })
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      store: new RedisStore({ client: redisClient}),
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
