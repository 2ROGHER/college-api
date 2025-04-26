import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { envs } from './config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './logger';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // Here we need to create a microservice factory to create a microservices
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: 1, // Transport type (1 for TCP)
  //     options: {
  //       host: 'localhost', // Hostname for the microservice
  //       port: envs.port ?? 3000, // Port for the microservice and the gateway to listen on this port for default
  //     },
  //   }
  // );

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // Buffer logs until the application is ready
    logger: ['error', 'warn', 'log'], // Set the logger to log errors, warnings, and logs
  });
  const logger = app.get(LoggerService); // Get the custom logger service from the application context
  app.useLogger(logger); // Set the logger for the application by the logger service custom service

  app.use(helmet()); // Use helmet for security headers

  // CORS is not applicable for microservices. Remove enableCors call.
  app.enableCors(
    // CORS configuration can be added here if needed
    {
      origin: '*', // Allow all origins (for development purposes, restrict in production)
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    },
  ); // Enable CORS for the application

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Router centralized API Gateway to microservices')
    .setVersion('1.0')
    .build(); // Create a Swagger configuration object to document the API

  const document = SwaggerModule.createDocument(app, config); // Create a Swagger document using the app and the configuration
  SwaggerModule.setup('docs', app, document); // Set up the Swagger module to serve the API documentation at the /docs endpoint

  await app.listen(envs.port ?? 8000); // Start the application and listen on the specified port
  logger.log(`API Gateway is running on: http://localhost:${envs.port ?? 8000}`); // Log the URL where the API Gateway is running
}
bootstrap();
