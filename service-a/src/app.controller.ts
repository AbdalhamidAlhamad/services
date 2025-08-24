import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  readHello() {
    return {data: this.appService.getHello()};
  }

  @Post()
  writeHello(@Body("message") message) {
    return {data: this.appService.writeHello(message)};
  }
}
