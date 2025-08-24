import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ServiceAController } from './service-a.controller';
import { ServiceAService } from './service-a.service';

@Module({
  imports: [HttpModule],
  providers: [ServiceAService],
  controllers: [ServiceAController],
})
export class ServiceAModule {}
