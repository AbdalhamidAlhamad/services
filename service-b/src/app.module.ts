import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceAModule } from './service-a/service-a.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServiceAModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
