import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ServiceBController } from './service-b.controller';
import { ServiceBService } from './service-b.service';

@Module({
    imports: [HttpModule],
    controllers: [ServiceBController],
    providers: [ServiceBService],
})
export class ServiceBModule {}
