import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceBService {
  private serviceBUrl: string;
  private jwtSecret: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.serviceBUrl =
      this.configService.getOrThrow<string>('SERVICE_B_BASE_URL');
    this.jwtSecret = this.configService.getOrThrow<string>('SERVICE_JWT_TOKEN');
  }

  async getHello(): Promise<string> {
    try {
      const res = await this.httpService.axiosRef.get(this.serviceBUrl, {
        headers: {
          Authorization: `Bearer ${this.jwtSecret}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedException('Unauthorized access to Service A');
      }
      throw new Error('Error fetching data from Service A');
    }
  }

  async writeHello(message: string): Promise<string> {
    try {
      const res = await this.httpService.axiosRef.post(
        this.serviceBUrl,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${this.jwtSecret}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedException('Unauthorized access to Service A');
      }
      throw new Error('Error fetching data from Service A');
    }
  }
}
