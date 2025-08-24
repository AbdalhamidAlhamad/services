import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from service B';
  }


  writeHello(message: string): string {
    return `You wrote ${message} into service B`;
  }
}
