import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { decodeJwt } from './jwt-decoder.util';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No Authorization header');
    }
    console.log('Authorization Header:', authHeader);
    const decoded = decodeJwt(authHeader.split(' ')[1]);
    console.log('Decoded JWT:', decoded);
    return { data: this.appService.getHello() };
  }

  @Post()
  writeHello(@Body('message') message: string, @Req() req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No Authorization header');
    }
    console.log('Authorization Header:', authHeader);
    const decoded = decodeJwt(authHeader.split(' ')[1]);
    console.log('Decoded JWT:', decoded);
    return { data: this.appService.writeHello(message) };
  }
}
