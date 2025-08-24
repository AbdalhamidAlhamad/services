import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello From Service A';
  }

  writeHello(message: string): string {
    return `You wrote: ${message} Into Service A`;
  }
}
