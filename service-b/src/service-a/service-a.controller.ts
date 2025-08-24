import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ServiceAService } from './service-a.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import  permissions from '../permessions.json';

@Controller('service-a')
@ApiTags('Service A')
@ApiBearerAuth()
export class ServiceAController {
  constructor(private readonly serviceAService: ServiceAService) {}

  @Get()
  async getHello() {
    if (!permissions.includes('read')) {
      throw new UnauthorizedException();
    }
    return this.serviceAService.getHello();
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
    return this.serviceAService.writeHello(message);
  }
}
