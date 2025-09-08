import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ServiceBService } from './service-b.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
@Controller('service-b')
@ApiTags('Service B')
@ApiBearerAuth()
export class ServiceBController {
  constructor(private readonly serviceBService: ServiceBService) {}

  @Get()
  async readHello(@Req() req) {
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
    return this.serviceBService.writeHello(message);
  }
}
