import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ServiceBService } from './service-b.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import  permissions from '../permessions.json';
@Controller('service-b')
@ApiTags('Service B')
@ApiBearerAuth()
export class ServiceBController {
  constructor(private readonly serviceBService: ServiceBService) {}

  @Get()
  async readHello() {
    if (!permissions.includes('read')) {
      throw new UnauthorizedException();
    }
    return this.serviceBService.getHello();
  }

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Hello from Swagger!' },
      },
      required: ['message'],
    },
  })
  async writeHello(@Body('message') message: string) {
    if (!permissions.includes('write')) {
      throw new UnauthorizedException();
    }
    return this.serviceBService.writeHello(message);
  }
}
