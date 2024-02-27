import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const config = app.get(ConfigService)

  const USER = config.get("RABBITMQ_USER")
  const PASS = config.get("RABBITMQ_PASS")
  const HOST = config.get("RABBITMQ_HOST")
  const QUEUE = config.get("RABBITMQ_AUTH_QUEUE")

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASS}@${HOST}`],
      noAck: false,
      queue: QUEUE,
      queueOptions: {
        durable: true
      }
    }
  })
  app.startAllMicroservices()
}
bootstrap();
