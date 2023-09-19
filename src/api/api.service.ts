import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { MissingEnvError } from '@hub2/common';


@Injectable()
export class ApiService {

  private readonly apiUrl: string;
  private readonly apiSecret: string;

  constructor(
    private readonly http: HttpService,
  ) {
    this.apiUrl = process.env.API_URL ?? '';
    this.apiSecret = process.env.API_SECRET ?? '';
    if (!this.apiUrl) {
      throw new MissingEnvError('API_URL');
    }
    if (!this.apiSecret) {
      throw new MissingEnvError('API_SECRET');
    }
  }

  public async get(path): Promise<any> {
    try {
      const config = {
        headers: {
          Authorization: this.apiSecret
        }
      }
      const res = await lastValueFrom<any>(
        this.http.get(
          `${this.apiUrl}${path}`,
          config
        ),
      );
      return res.data;
    } catch (e) {
      throw new Error();
    }
  }

}
