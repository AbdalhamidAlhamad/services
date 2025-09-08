import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceAService {
  private readonly serviceAUrl: string;
  private jwtSecret: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.serviceAUrl =
      this.configService.getOrThrow<string>('SERVICE_A_BASE_URL');
    this.jwtSecret = this.configService.getOrThrow<string>('SERVICE_JWT_TOKEN');
  }

  async getHello(): Promise<string> {
    try {
      const response = await this.httpService.axiosRef.get(this.serviceAUrl, {
        headers: {
          Authorization: `Bearer ${this.jwtSecret}`,
        },
      });
      return response.data;
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
      const response = await this.httpService.axiosRef.post(
        this.serviceAUrl,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${this.jwtSecret}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedException('Unauthorized access to Service A');
      }
      throw new Error('Error fetching data from Service A');
    }
  }
}
