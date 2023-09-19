import { HttpService } from '@nestjs/axios';
export declare class ApiService {
    private readonly http;
    private readonly apiUrl;
    private readonly apiSecret;
    constructor(http: HttpService);
    get(path: any): Promise<any>;
}
