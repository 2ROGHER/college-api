import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables from .env file and set them as global variables
    // Other modules can be imported here as needed (proxy module here letter)
  ],
  controllers: [AppController],
  providers: [
    // Providers can be added here as needed (logger service here letter)
    AppService,
    LoggerService, // Custom logger service for logging messages
  ],
})
export class AppModule {}
